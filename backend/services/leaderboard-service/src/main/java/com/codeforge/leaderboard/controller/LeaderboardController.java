package com.codeforge.leaderboard.controller;

import com.codeforge.leaderboard.model.LeaderboardEntry;
import com.codeforge.leaderboard.service.LeaderboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public ResponseEntity<List<LeaderboardEntry>> getGlobalLeaderboard() {
        return ResponseEntity.ok(leaderboardService.getLeaderboard());
    }

    @GetMapping("/contest/{contestId}")
    public ResponseEntity<List<LeaderboardEntry>> getContestLeaderboard(@PathVariable Long contestId) {
        return ResponseEntity.ok(leaderboardService.getLeaderboard());
    }
}
