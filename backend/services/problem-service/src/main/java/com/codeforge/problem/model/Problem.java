package com.codeforge.problem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Column(nullable = false)
    private String difficulty;

    @NotBlank
    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private Integer acceptance = 0;

    @Column(nullable = false)
    private Integer solved = 0;

    @Lob
    @Column(nullable = false)
    private String description;

    @Lob
    private String examples;

    @Lob
    private String constraints;

    @Lob
    private String starterCode;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Problem() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public Integer getAcceptance() { return acceptance; }
    public void setAcceptance(Integer acceptance) { this.acceptance = acceptance; }

    public Integer getSolved() { return solved; }
    public void setSolved(Integer solved) { this.solved = solved; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getExamples() { return examples; }
    public void setExamples(String examples) { this.examples = examples; }

    public String getConstraints() { return constraints; }
    public void setConstraints(String constraints) { this.constraints = constraints; }

    public String getStarterCode() { return starterCode; }
    public void setStarterCode(String starterCode) { this.starterCode = starterCode; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
