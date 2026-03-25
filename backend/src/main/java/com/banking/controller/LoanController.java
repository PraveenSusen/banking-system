package com.banking.controller;

import com.banking.dto.LoanRequest;
import com.banking.entity.Loan;
import com.banking.service.LoanService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    // 🧾 Apply Loan (USER)
    @PostMapping("/apply")
    public Loan applyLoan(@RequestBody LoanRequest request,
                          Authentication auth) {

        return loanService.applyLoan(
                request.getAmount(),
                request.getTenureMonths(),
                auth.getName()
        );
    }

    // 👤 My Loans (USER)
    @GetMapping("/me")
    public List<Loan> myLoans(Authentication auth) {
        return loanService.getMyLoans(auth.getName());
    }

    // 👑 Admin - View All Loans
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    // 👑 Admin - Approve
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/approve/{id}")
    public Loan approve(@PathVariable Long id) {
        return loanService.approveLoan(id);
    }

    // 👑 Admin - Reject
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/reject/{id}")
    public Loan reject(@PathVariable Long id) {
        return loanService.rejectLoan(id);
    }
}