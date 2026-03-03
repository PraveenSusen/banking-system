package com.banking.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.banking.entity.Account;
import com.banking.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findBySourceAccountOrDestinationAccountOrderByTimestampDesc(
            Account source,
            Account destination,
            Pageable pageable
    );
}