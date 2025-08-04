package com.mobios.userservice.service;

import com.mobios.userservice.model.User;
import com.mobios.userservice.repository.UserRepository;
import com.mobios.userservice.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Optional<Map<String, String>> login(String username, String rawPassword) {
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isPresent() && passwordEncoder.matches(rawPassword, userOpt.get().getPassword())) {
            String token = jwtUtil.generateToken(username);
            return Optional.of(Map.of("token", token));
        }

        return Optional.empty();
    }

    public String logout() {
        return "Logged out successfully (client should discard token)";
    }

    public boolean resetPassword(String username, String email, String newPassword) {
        Optional<User> userOpt = userRepository.findByUsernameAndEmail(username, email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }

        return false;
    }

}
