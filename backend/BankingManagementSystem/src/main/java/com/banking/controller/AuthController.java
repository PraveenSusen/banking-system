package com.banking.controller;

import com.banking.dto.LoginRequestDTO;
import com.banking.dto.RegisterRequestDTO;
import com.banking.entity.User;
import com.banking.repository.UserRepository;
import com.banking.security.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequestDTO request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole("USER");   // ✅ DEFAULT ROLE

        userRepository.save(user);

        return "User Registered Successfully ✅";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        // ✅ Pass role to token
        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }
}