package com.banking.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.banking.dto.AccountCreateDTO;
import com.banking.dto.AccountResponseDTO;
import com.banking.dto.DepositRequestDTO;
import com.banking.dto.TransactionDTO;
import com.banking.dto.TransferRequestDTO;
import com.banking.service.AccountService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    // =========================
    // CREATE ACCOUNT
    // =========================
    @PostMapping("/create")
    public AccountResponseDTO createAccount(
            @RequestBody AccountCreateDTO request,
            Authentication authentication) {

        String email = authentication.getName();
        return accountService.createAccount(request.getAccountNumber(), email);
    }

    // =========================
    // GET MY ACCOUNT (Dashboard)
    // =========================
    @GetMapping("/me")
    public AccountResponseDTO getMyAccount(Authentication authentication) {

        String email = authentication.getName();
        return accountService.getAccountByEmail(email);
    }

    // =========================
    // DEPOSIT (NO accNo required)
    // =========================
    @PostMapping("/deposit")
    public AccountResponseDTO deposit(
            @RequestBody DepositRequestDTO request,
            Authentication authentication) {

        String email = authentication.getName();
        return accountService.deposit(request.getAmount(), email);
    }

    // =========================
    // WITHDRAW (NO accNo required)
    // =========================
    @PostMapping("/withdraw")
    public AccountResponseDTO withdraw(
            @RequestBody DepositRequestDTO request,
            Authentication authentication) {

        String email = authentication.getName();

        return accountService.withdraw(
                request.getAmount(),
                email
        );
    }

    // =========================
    // TRANSFER (only destination needed)
    // =========================
    @PostMapping("/transfer")
    public AccountResponseDTO transfer(
            @RequestBody TransferRequestDTO request,
            Authentication authentication) {

        String email = authentication.getName();

        return accountService.transfer(
                request.getToAcc(),
                request.getAmount(),
                email
        );
    }

    // =========================
    // GET MY TRANSACTIONS
    // =========================
    @GetMapping("/transactions/me")
    public Page<TransactionDTO> getMyTransactions(
            Authentication authentication,
            Pageable pageable) {

        String email = authentication.getName();
        return accountService.getTransactionsByEmail(email, pageable);
    }
}