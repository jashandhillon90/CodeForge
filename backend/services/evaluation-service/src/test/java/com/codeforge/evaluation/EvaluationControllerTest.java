package com.codeforge.evaluation;

import com.codeforge.evaluation.model.EvaluationResult;
import com.codeforge.evaluation.repository.EvaluationResultRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class EvaluationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EvaluationResultRepository evaluationResultRepository;

    @Test
    void getAllEvaluationsShouldReturnResults() throws Exception {
        EvaluationResult result = new EvaluationResult();
        result.setId(1L);
        result.setSubmissionId(12L);
        result.setStatus("MOCK_PASS");
        result.setPassedTests(5);
        result.setTotalTests(5);
        result.setScore(100.0);
        given(evaluationResultRepository.findAll()).willReturn(List.of(result));

        mockMvc.perform(get("/api/evaluations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status").value("MOCK_PASS"));
    }
}
