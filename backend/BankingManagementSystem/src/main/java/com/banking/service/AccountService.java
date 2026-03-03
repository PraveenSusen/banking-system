package com.banking.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banking.dto.AccountResponseDTO;
import com.banking.dto.TransactionDTO;
import com.banking.entity.Account;
import com.banking.entity.Transaction;
import com.banking.entity.User;
import com.banking.exception.CustomException;
import com.banking.repository.AccountRepository;
import com.banking.repository.TransactionRepository;
import com.banking.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    // =============================
    // CREATE ACCOUNT
    // =============================
    public AccountResponseDTO createAccount(String accNo, String email) {

        if (accountRepository.findByAccountNumber(accNo).isPresent()) {
            throw new CustomException("Account number already exists");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found"));

        Account account = new Account();
        account.setAccountNumber(accNo);
        account.setBalance(0);
        account.setUser(user);

        accountRepository.save(account);

        return mapToDTO(account);
    }

    // =============================
    // GET ACCOUNT BY EMAIL
    // =============================
    public AccountResponseDTO getAccountByEmail(String email) {

        Account account = accountRepository
                .findByUser_Email(email)
                .orElseThrow(() -> new CustomException("Account not found"));

        return mapToDTO(account);
    }

    // =============================
    // DEPOSIT
    // =============================
    public AccountResponseDTO deposit(double amount, String email) {

        if (amount <= 0) {
            throw new CustomException("Invalid deposit amount");
        }

        Account account = getAccountByUserEmail(email);

        account.setBalance(account.getBalance() + amount);

        saveTransaction("DEPOSIT", amount, null, account);

        return mapToDTO(account);
    }

    // =============================
    // WITHDRAW
    // =============================
    public AccountResponseDTO withdraw(double amount, String email) {

        Account account = accountRepository
                .findByUser_Email(email)
                .orElseThrow(() -> new CustomException("Account not found"));

        if (account.getBalance() < amount) {
            throw new CustomException("Insufficient balance");
        }

        account.setBalance(account.getBalance() - amount);

        saveTransaction("WITHDRAW", amount, account, null);

        return mapToDTO(account);
    }
    // =============================
    // TRANSFER
    // =============================
    public AccountResponseDTO transfer(String toAcc,
                                       double amount,
                                       String email) {

        if (amount <= 0) {
            throw new CustomException("Invalid transfer amount");
        }

        Account source = getAccountByUserEmail(email);

        Account destination = accountRepository
                .findByAccountNumber(toAcc)
                .orElseThrow(() -> new CustomException("Destination account not found"));

        if (source.getBalance() < amount) {
            throw new CustomException("Insufficient balance");
        }

        source.setBalance(source.getBalance() - amount);
        destination.setBalance(destination.getBalance() + amount);

        accountRepository.save(source);
        accountRepository.save(destination);

        saveTransaction("TRANSFER", amount, source, destination);

        return mapToDTO(source);
    }

    // =============================
    // GET TRANSACTIONS
    // =============================
    public Page<TransactionDTO> getTransactionsByEmail(String email, Pageable pageable) {

        Account account = accountRepository
                .findByUser_Email(email)
                .orElseThrow(() -> new CustomException("Account not found"));

        Page<Transaction> transactions =
                transactionRepository
                        .findBySourceAccountOrDestinationAccountOrderByTimestampDesc(
                                account,
                                account,
                                pageable
                        );

        return transactions.map(txn ->
                new TransactionDTO(
                        txn.getType(),
                        txn.getAmount(),
                        txn.getSourceAccount() != null
                                ? txn.getSourceAccount().getAccountNumber()
                                : null,
                        txn.getDestinationAccount() != null
                                ? txn.getDestinationAccount().getAccountNumber()
                                : null,
                        txn.getTimestamp().toString()
                )
        );
    
    }

    // =============================
    // PRIVATE HELPERS
    // =============================
    private Account getAccountByUserEmail(String email) {

        return accountRepository
                .findByUser_Email(email)
                .orElseThrow(() -> new CustomException("Account not found"));
    }

    private void saveTransaction(String type,
                                 double amount,
                                 Account source,
                                 Account destination) {

        Transaction txn = new Transaction();
        txn.setType(type);
        txn.setAmount(amount);
        txn.setTimestamp(LocalDateTime.now());
        txn.setSourceAccount(source);
        txn.setDestinationAccount(destination);

        transactionRepository.save(txn);
    }

    private AccountResponseDTO mapToDTO(Account account) {

        return new AccountResponseDTO(
                account.getAccountNumber(),
                account.getBalance(),
                account.getUser().getName(),
                account.getUser().getEmail()
        );
    }
}