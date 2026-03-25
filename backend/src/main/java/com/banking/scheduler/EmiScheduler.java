package com.banking.scheduler;

import com.banking.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmiScheduler {

    private final LoanService loanService;

    // 🔥 Runs every 30 seconds (for testing)
    @Scheduled(cron = "0 0 1 5 * ?")
    public void runEmi() {
        System.out.println("Monthly EMI Running...");
        loanService.processEMI();
    }
}