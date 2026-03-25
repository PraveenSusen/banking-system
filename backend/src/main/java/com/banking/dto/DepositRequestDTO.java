package com.banking.dto;

import lombok.Data;

@Data
public class DepositRequestDTO {
    private String accNo;
    private double amount;
}