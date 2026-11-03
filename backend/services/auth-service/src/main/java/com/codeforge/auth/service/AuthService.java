package com.codeforge.auth.service;

import com.codeforge.auth.dto.AuthResponse;
import com.codeforge.auth.dto.LoginRequest;
import com.codeforge.auth.dto.RegisterRequest;
import com.codeforge.auth.model.User;
import com.codeforge.auth.repository.UserRepository;
import com.codeforge.auth.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().trim();
        String normalizedEmail = email.toLowerCase();
        String uid = request.getUid().trim();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("Email already registered");
        }
        if (userRepository.existsByUid(uid)) {
            throw new IllegalArgumentException("UID already registered");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(normalizedEmail);
        user.setUid(uid);
        user.setSection(request.getSection());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.STUDENT);
        user.setEnabled(true);

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved.getEmail(), saved.getRole().name());
        return new AuthResponse(token, saved.getEmail(), saved.getUid(), saved.getName(), saved.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail().trim().toLowerCase(), request.getPassword())
        );

        if (!authentication.isAuthenticated()) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getEmail(), user.getUid(), user.getName(), user.getRole().name());
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email.trim().toLowerCase());
    }
}
