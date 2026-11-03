package com.codeforge.leaderboard.service;

import com.codeforge.leaderboard.model.LeaderboardEntry;
import com.codeforge.leaderboard.repository.LeaderboardEntryRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardService {

    private final LeaderboardEntryRepository leaderboardEntryRepository;

    @Value("${app.leaderboard.top-limit:25}")
    private int topLimit;

    public LeaderboardService(LeaderboardEntryRepository leaderboardEntryRepository) {
        this.leaderboardEntryRepository = leaderboardEntryRepository;
    }

    public List<LeaderboardEntry> getLeaderboard() {
        List<LeaderboardEntry> entries = leaderboardEntryRepository.findAllByOrderByScoreDescSolvedProblemsDesc();
        for (int i = 0; i < entries.size(); i++) {
            entries.get(i).setRank(i + 1);
        }
        return entries.stream().limit(topLimit).toList();
    }
}
