package com.codeforge.auth;

import com.codeforge.auth.model.User;
import com.codeforge.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AuthServiceApplication {

    @Value("${app.admin.email:admin@university.edu}")
    private String adminEmail;

    @Value("${app.admin.password:Admin123!}")
    private String adminPassword;

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String normalizedEmail = adminEmail.trim().toLowerCase();
            if (userRepository.existsByEmail(normalizedEmail)) {
                return;
            }

            User admin = new User();
            admin.setName("System Administrator");
            admin.setEmail(normalizedEmail);
            admin.setUid("ADMIN0001");
            admin.setSection("ADMIN");
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(User.Role.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);
        };
    }
}
