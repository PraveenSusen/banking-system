package com.banking.dto;

import lombok.Data;

@Data
public class LoanRequest {

    private double amount;
    private int tenureMonths;
}