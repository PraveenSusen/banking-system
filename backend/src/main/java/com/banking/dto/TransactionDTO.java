package com.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionDTO {

    private String type;
    private double amount;
    private String sourceAccount;
    private String destinationAccount;
    private String timestamp;
}