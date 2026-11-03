package com.codeforge.leaderboard.repository;

import com.codeforge.leaderboard.model.LeaderboardEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaderboardEntryRepository extends JpaRepository<LeaderboardEntry, Long> {
    List<LeaderboardEntry> findAllByOrderByScoreDescSolvedProblemsDesc();
}
