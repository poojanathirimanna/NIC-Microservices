package com.mobios.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.mobios.userservice.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    // ✅ Additional method to find user by username and email
}
