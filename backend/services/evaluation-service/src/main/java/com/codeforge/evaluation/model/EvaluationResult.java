package com.codeforge.evaluation.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "evaluation_results")
public class EvaluationResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long submissionId;

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(nullable = false)
    private Integer passedTests = 0;

    @Column(nullable = false)
    private Integer totalTests = 0;

    @Column(nullable = false)
    private Double score = 0.0;

    @Lob
    private String output;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public EvaluationResult() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSubmissionId() { return submissionId; }
    public void setSubmissionId(Long submissionId) { this.submissionId = submissionId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getPassedTests() { return passedTests; }
    public void setPassedTests(Integer passedTests) { this.passedTests = passedTests; }

    public Integer getTotalTests() { return totalTests; }
    public void setTotalTests(Integer totalTests) { this.totalTests = totalTests; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
