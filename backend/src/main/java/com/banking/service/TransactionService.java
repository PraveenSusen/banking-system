
package com.banking.service;

import com.banking.entity.Account;
import com.banking.entity.Transaction;
import com.banking.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor 
public class TransactionService {

    private final TransactionRepository transactionRepository;

    // 🔄 Generic transaction method
    public void createTransaction(
            String type,
            double amount,
            Account source,
            Account destination
    ) {
        Transaction transaction = new Transaction();
        transaction.setType(type);
        transaction.setAmount(amount);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setSourceAccount(source);
        transaction.setDestinationAccount(destination);

        transactionRepository.save(transaction);
    }

    // 💸 Loan credit helper
    public void createLoanTransaction(Account account, double amount) {
        createTransaction("LOAN_CREDIT", amount, null, account);
    }
}