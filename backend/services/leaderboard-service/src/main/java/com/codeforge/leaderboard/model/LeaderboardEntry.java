package com.codeforge.leaderboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "leaderboard_entries")
public class LeaderboardEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer score = 0;

    @Column(nullable = false)
    private Integer solvedProblems = 0;

    @Column(nullable = false)
    private Integer rank = 0;

    public LeaderboardEntry() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public Integer getSolvedProblems() { return solvedProblems; }
    public void setSolvedProblems(Integer solvedProblems) { this.solvedProblems = solvedProblems; }

    public Integer getRank() { return rank; }
    public void setRank(Integer rank) { this.rank = rank; }
}
