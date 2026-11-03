package com.codeforge.auth.controller;

import com.codeforge.auth.dto.AuthResponse;
import com.codeforge.auth.dto.LoginRequest;
import com.codeforge.auth.dto.RegisterRequest;
import com.codeforge.auth.model.User;
import com.codeforge.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth != null ? auth.getName() : null;

        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        return authService.findByEmail(email)
                .map(user -> ResponseEntity.ok(Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "uid", user.getUid(),
                        "section", user.getSection(),
                        "role", user.getRole().name())))
                .orElse(ResponseEntity.status(401).body(Map.of("message", "User not found")));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
