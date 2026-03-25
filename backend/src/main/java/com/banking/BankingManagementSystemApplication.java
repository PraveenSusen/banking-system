package com.banking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class BankingManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankingManagementSystemApplication.class, args);
	}

}
