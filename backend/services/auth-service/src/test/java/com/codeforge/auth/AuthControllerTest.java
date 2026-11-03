package com.codeforge.auth;

import com.codeforge.auth.dto.LoginRequest;
import com.codeforge.auth.dto.RegisterRequest;
import com.codeforge.auth.model.User;
import com.codeforge.auth.repository.UserRepository;
import com.codeforge.auth.security.JwtService;
import com.codeforge.auth.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        given(userRepository.existsByEmail("student@university.edu")).willReturn(false);
        given(userRepository.existsByUid("2024CS007")).willReturn(false);
        User user = new User();
        user.setId(1L);
        user.setName("Test Student");
        user.setEmail("student@university.edu");
        user.setUid("2024CS007");
        user.setPassword(passwordEncoder.encode("Password123!"));
        user.setRole(User.Role.STUDENT);
        user.setEnabled(true);
        given(userRepository.findByEmail("student@university.edu")).willReturn(java.util.Optional.of(user));
    }

    @Test
    void registerShouldCreateUserAndReturnToken() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setName("Test Student");
        request.setEmail("student@university.edu");
        request.setUid("2024CS007");
        request.setSection("CS-A");
        request.setPassword("Password123!");

        given(userRepository.save(any(User.class))).willAnswer(invocation -> {
            User saved = invocation.getArgument(0);
            saved.setId(99L);
            return saved;
        });

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Test Student\",\"email\":\"student@university.edu\",\"uid\":\"2024CS007\",\"section\":\"CS-A\",\"password\":\"Password123!\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.role").value("STUDENT"));
    }

    @Test
    void loginShouldReturnToken() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("student@university.edu");
        request.setPassword("Password123!");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"student@university.edu\",\"password\":\"Password123!\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.email").value("student@university.edu"));
    }
}
