package com.codeforge.problem.dto;

import jakarta.validation.constraints.NotBlank;

public class ProblemRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    @NotBlank(message = "Topic is required")
    private String topic;

    private Integer acceptance = 0;
    private Integer solved = 0;

    @NotBlank(message = "Description is required")
    private String description;

    private String examples;
    private String constraints;
    private String starterCode;

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
}
