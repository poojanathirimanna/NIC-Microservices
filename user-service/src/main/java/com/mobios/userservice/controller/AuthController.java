package com.mobios.userservice.controller;

import com.mobios.userservice.model.User;
import com.mobios.userservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ✅ Login using AuthService
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<?> response = authService.login(user.getUsername(), user.getPassword());

        return response.isPresent()
                ? ResponseEntity.ok(response.get())
                : ResponseEntity.status(401).body("Invalid credentials");
    }

    // ✅ Logout placeholder
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok(authService.logout());
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String email = body.get("email");
        String newPassword = body.get("newPassword");

        boolean success = authService.resetPassword(username, email, newPassword);
        return success
                ? ResponseEntity.ok("Password reset successful")
                : ResponseEntity.status(404).body("User not found or email mismatch");
    }

}
