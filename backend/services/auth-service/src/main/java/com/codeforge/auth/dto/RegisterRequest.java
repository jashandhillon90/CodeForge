package com.codeforge.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 120, message = "Name must be between 2 and 120 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "UID is required")
    @Pattern(regexp = "^20\\d{2}(CS|IT)\\d{3}$", message = "UID must match format like 2024CS007")
    private String uid;

    @NotBlank(message = "Section is required")
    private String section;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
