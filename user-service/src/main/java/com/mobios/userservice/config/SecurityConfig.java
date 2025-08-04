package com.mobios.userservice.config;

import com.mobios.userservice.security.JwtFilter;
import com.mobios.userservice.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    // Inject JwtUtil via constructor
    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())   // ✅ Disable CSRF for stateless JWT
                .authorizeHttpRequests(auth -> auth
                        // ✅ Allow login and registration without token
                        .requestMatchers("/api/auth/login", "/api/users/register" ,"/api/auth/forgot-password"
                        ).permitAll()
                        // ✅ Protect all other endpoints
                        .anyRequest().authenticated()
                )
                // ✅ Add JWT filter before Spring Security’s default auth filter
                .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
