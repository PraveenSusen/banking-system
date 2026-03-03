package com.banking.dto;

import lombok.Data;

@Data
public class TransferRequestDTO {

    private String fromAcc;
    private String toAcc;
    private double amount;
}