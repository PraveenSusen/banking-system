package com.banking.repository;

import com.banking.entity.Account;
import com.banking.entity.Transaction;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(String accountNumber);
    Optional<Account> findByUser_Email(String email);
   
}