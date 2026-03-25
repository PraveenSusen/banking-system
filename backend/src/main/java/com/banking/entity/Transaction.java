package com.banking.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // DEPOSIT, WITHDRAW, TRANSFER

    private double amount;

    private LocalDateTime timestamp;

    @ManyToOne
    private Account sourceAccount;

    @ManyToOne
    private Account destinationAccount;
}