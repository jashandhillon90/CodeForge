package com.codeforge.auth.dto;

public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private String email;
    private String uid;
    private String name;
    private String role;

    public AuthResponse() {}

    public AuthResponse(String token, String email, String uid, String name, String role) {
        this.token = token;
        this.email = email;
        this.uid = uid;
        this.name = name;
        this.role = role;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
