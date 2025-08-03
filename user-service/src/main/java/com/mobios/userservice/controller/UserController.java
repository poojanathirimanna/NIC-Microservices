package com.mobios.userservice.controller;

import com.mobios.userservice.model.User;
import com.mobios.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            registeredUser.setPassword(null); // Hide password in response
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // ✅ Login endpoint
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
        return loggedInUser.isPresent() ?
                ResponseEntity.ok("Login Successful") :
                ResponseEntity.status(401).body("Invalid Credentials");
    }

    // ✅ Logout endpoint
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // For now, just return success since no token/session is being tracked
        return ResponseEntity.ok("Logout Successful");
    }
}
