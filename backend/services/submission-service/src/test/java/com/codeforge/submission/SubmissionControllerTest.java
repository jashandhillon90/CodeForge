package com.codeforge.submission;

import com.codeforge.submission.model.Submission;
import com.codeforge.submission.repository.SubmissionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SubmissionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SubmissionRepository submissionRepository;

    @Test
    void getAllSubmissionsShouldReturnList() throws Exception {
        Submission submission = new Submission();
        submission.setId(1L);
        submission.setProblemId(7L);
        submission.setUserId(3L);
        submission.setLanguage("Java");
        submission.setCode("class Solution {}\n");
        submission.setStatus("PENDING");
        given(submissionRepository.findAll()).willReturn(List.of(submission));

        mockMvc.perform(get("/api/submissions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].language").value("Java"));
    }

    @Test
    void createSubmissionShouldPersist() throws Exception {
        Submission saved = new Submission();
        saved.setId(1L);
        saved.setProblemId(7L);
        saved.setUserId(3L);
        saved.setLanguage("Java");
        saved.setCode("class Solution {}\n");
        saved.setStatus("PENDING");
        given(submissionRepository.save(org.mockito.ArgumentMatchers.any(Submission.class))).willReturn(saved);

        mockMvc.perform(post("/api/submissions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"problemId\":7,\"userId\":3,\"language\":\"Java\",\"code\":\"class Solution {}\\n\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.language").value("Java"));
    }
}
