package com.codeforge.contest;

import com.codeforge.contest.model.Contest;
import com.codeforge.contest.repository.ContestRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContestRepository contestRepository;

    @Test
    void listContestsShouldReturnData() throws Exception {
        Contest contest = new Contest();
        contest.setId(1L);
        contest.setTitle("Winter Cup");
        contest.setDescription("Monthly challenge");
        contest.setStartTime(LocalDateTime.now());
        contest.setEndTime(LocalDateTime.now().plusHours(2));
        contest.setStatus("UPCOMING");
        given(contestRepository.findAll()).willReturn(List.of(contest));

        mockMvc.perform(get("/api/contests"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Winter Cup"));
    }

    @Test
    void registerParticipantShouldIncreaseCount() throws Exception {
        Contest contest = new Contest();
        contest.setId(1L);
        contest.setTitle("Winter Cup");
        contest.setDescription("Monthly challenge");
        contest.setStartTime(LocalDateTime.now());
        contest.setEndTime(LocalDateTime.now().plusHours(2));
        contest.setMaxParticipants(10);
        contest.setParticipantsCount(1);
        given(contestRepository.findById(1L)).willReturn(java.util.Optional.of(contest));
        given(contestRepository.save(org.mockito.ArgumentMatchers.any(Contest.class))).willAnswer(invocation -> {
            Contest c = invocation.getArgument(0);
            c.setParticipantsCount(2);
            return c;
        });

        mockMvc.perform(post("/api/contests/1/register")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.participantsCount").value(2));
    }
}
