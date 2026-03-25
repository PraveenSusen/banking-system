package com.banking.service;

import com.banking.entity.Account;
import com.banking.entity.Loan;
import com.banking.entity.LoanStatus;
import com.banking.entity.User;
import com.banking.repository.AccountRepository;
import com.banking.repository.LoanRepository;
import com.banking.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionService transactionService;

    private static final double FIXED_INTEREST = 10.0;

    // 🧾 Apply Loan
    public Loan applyLoan(double amount, int tenure, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Loan loan = new Loan();
        loan.setAmount(amount);
        loan.setInterestRate(FIXED_INTEREST);
        loan.setTenureMonths(tenure);
        loan.setStatus(LoanStatus.PENDING);
        loan.setCreatedAt(LocalDateTime.now());
        loan.setUser(user);

        return loanRepository.save(loan);
    }

    // 👤 Get My Loans
    public List<Loan> getMyLoans(String email) {
        return loanRepository.findByUser_Email(email);
    }

    // 👑 Admin - Approve Loan + CREDIT + EMI SETUP 💸
    public Loan approveLoan(Long loanId) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (loan.getStatus() == LoanStatus.APPROVED) {
            throw new RuntimeException("Loan already approved");
        }

        if (loan.getStatus() == LoanStatus.REJECTED) {
            throw new RuntimeException("Rejected loan cannot be approved");
        }

        // ✅ Calculate EMI
        double emi = calculateEMI(
                loan.getAmount(),
                loan.getInterestRate(),
                loan.getTenureMonths()
        );

        loan.setEmi(emi);
        loan.setRemainingAmount(loan.getAmount());
        loan.setRemainingMonths(loan.getTenureMonths());

        // ✅ Update status
        loan.setStatus(LoanStatus.APPROVED);

        // ✅ Get account
        Account account = accountRepository.findByUser_Email(
                loan.getUser().getEmail()
        ).orElseThrow(() -> new RuntimeException("Account not found"));

        // 💸 Credit loan
        account.setBalance(account.getBalance() + loan.getAmount());
        accountRepository.save(account);

        // 🔥 Loan credit transaction
        transactionService.createTransaction(
                "LOAN_CREDIT",
                loan.getAmount(),
                null,
                account
        );

        return loanRepository.save(loan);
    }

    // 💡 EMI Formula
    public double calculateEMI(double amount, double rate, int months) {
        double monthlyRate = rate / (12 * 100);

        return (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
               (Math.pow(1 + monthlyRate, months) - 1);
    }

    // 🔥 AUTO EMI PROCESS
    public void processEMI() {

        List<Loan> loans = loanRepository.findAll();

        for (Loan loan : loans) {

            if (loan.getStatus() != LoanStatus.APPROVED) continue;
            if (loan.getRemainingMonths() <= 0) continue;

            Account account = accountRepository.findByUser_Email(
                    loan.getUser().getEmail()
            ).orElseThrow();

            double emi = loan.getEmi();

            // ❌ If insufficient balance → apply penalty
            if (account.getBalance() < emi) {

                double penalty = emi * 0.02; // 2% penalty

                loan.setMissedEmiCount(loan.getMissedEmiCount() + 1);
                loan.setPenaltyAmount(loan.getPenaltyAmount() + penalty);

                loanRepository.save(loan);

                // 🔥 penalty transaction
                transactionService.createTransaction(
                        "EMI_PENALTY",
                        penalty,
                        null,
                        account
                );

                System.out.println("Penalty applied for Loan ID: " + loan.getId());
                continue;
            }

            // ✅ Deduct EMI
            account.setBalance(account.getBalance() - emi);
            accountRepository.save(account);

            loan.setRemainingAmount(loan.getRemainingAmount() - emi);
            loan.setRemainingMonths(loan.getRemainingMonths() - 1);

            loanRepository.save(loan);

            // 🔥 EMI transaction
            transactionService.createTransaction(
                    "EMI_DEBIT",
                    emi,
                    account,
                    null
            );
        }
    }

    // 👑 Reject Loan
    public Loan rejectLoan(Long loanId) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (loan.getStatus() == LoanStatus.APPROVED) {
            throw new RuntimeException("Approved loan cannot be rejected");
        }

        loan.setStatus(LoanStatus.REJECTED);

        return loanRepository.save(loan);
    }

    // 👑 Admin - View All Loans
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }
}