package com.codeforge.leaderboard;

import com.codeforge.leaderboard.model.LeaderboardEntry;
import com.codeforge.leaderboard.repository.LeaderboardEntryRepository;
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
class LeaderboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LeaderboardEntryRepository leaderboardEntryRepository;

    @Test
    void getLeaderboardShouldReturnEntries() throws Exception {
        LeaderboardEntry entry = new LeaderboardEntry();
        entry.setId(1L);
        entry.setUserId(2L);
        entry.setName("Alice");
        entry.setScore(500);
        entry.setSolvedProblems(8);
        entry.setRank(1);
        given(leaderboardEntryRepository.findAllByOrderByScoreDescSolvedProblemsDesc()).willReturn(List.of(entry));

        mockMvc.perform(get("/api/leaderboard"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Alice"));
    }
}
