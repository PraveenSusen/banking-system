package com.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountResponseDTO {

    private String accountNumber;
    private double balance;
    private String userName;
    private String userEmail;
}