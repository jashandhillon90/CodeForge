package com.codeforge.analytics;

import com.codeforge.analytics.model.AnalyticsSnapshot;
import com.codeforge.analytics.repository.AnalyticsSnapshotRepository;
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
class AnalyticsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnalyticsSnapshotRepository analyticsSnapshotRepository;

    @Test
    void getAnalyticsShouldReturnSnapshots() throws Exception {
        AnalyticsSnapshot snapshot = new AnalyticsSnapshot();
        snapshot.setId(1L);
        snapshot.setMetric("total_users");
        snapshot.setValue(120.0);
        given(analyticsSnapshotRepository.findAll()).willReturn(List.of(snapshot));

        mockMvc.perform(get("/api/analytics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].metric").value("total_users"));
    }
}
