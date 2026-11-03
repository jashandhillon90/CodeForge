package com.codeforge.problem;

import com.codeforge.problem.model.Problem;
import com.codeforge.problem.repository.ProblemRepository;
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
class ProblemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProblemRepository problemRepository;

    @Test
    void listProblemsShouldReturnSampleData() throws Exception {
        Problem problem = new Problem();
        problem.setId(1L);
        problem.setTitle("Two Sum");
        problem.setDifficulty("Easy");
        problem.setTopic("Arrays");
        problem.setDescription("Given an array of integers");
        given(problemRepository.findAll()).willReturn(List.of(problem));

        mockMvc.perform(get("/api/problems"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Two Sum"));
    }

    @Test
    void createProblemShouldPersist() throws Exception {
        Problem saved = new Problem();
        saved.setId(1L);
        saved.setTitle("Two Sum");
        saved.setDifficulty("Easy");
        saved.setTopic("Arrays");
        saved.setDescription("Given an array of integers");
        given(problemRepository.save(org.mockito.ArgumentMatchers.any(Problem.class))).willReturn(saved);

        mockMvc.perform(post("/api/problems")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Two Sum\",\"difficulty\":\"Easy\",\"topic\":\"Arrays\",\"description\":\"Given an array of integers\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Two Sum"));
    }
}
