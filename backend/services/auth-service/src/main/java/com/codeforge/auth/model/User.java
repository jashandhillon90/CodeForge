package com.codeforge.auth.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(name = "uk_users_email", columnNames = "email"),
    @UniqueConstraint(name = "uk_users_uid", columnNames = "uid")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 120)
    private String name;

    @NotBlank
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Size(min = 8, max = 120)
    private String password;

    @NotBlank
    @Size(max = 30)
    @Column(nullable = false, unique = true)
    private String uid;

    @Size(max = 50)
    private String section;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.STUDENT;

    @Column(nullable = false)
    private Boolean enabled = true;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String name, String email, String password, String uid, String section, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.uid = uid;
        this.section = section;
        this.role = role;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Boolean getEnabled() { return enabled; }
    public void setEnabled(Boolean enabled) { this.enabled = enabled; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public enum Role {
        STUDENT,
        ADMIN
    }
}
