package com.mobios.userservice.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // ✅ Skip JWT check for public routes
        String path = request.getRequestURI();
        if (path.startsWith("/api/auth/login") ||
                path.startsWith("/api/users/register") ||
                path.startsWith("/api/auth/forgot-password")) {
            chain.doFilter(request, response);
            return;
        }

        // ✅ JWT Token check
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);
                // Optionally set SecurityContext here
            }
        }

        chain.doFilter(request, response);
    }
}
