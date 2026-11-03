package com.codeforge.problem.controller;

import com.codeforge.problem.dto.ProblemRequest;
import com.codeforge.problem.model.Problem;
import com.codeforge.problem.service.ProblemService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public List<Problem> getAllProblems() {
        return problemService.getAllProblems();
    }

    @GetMapping("/{id}")
    public Problem getProblemById(@PathVariable Long id) {
        return problemService.getProblemById(id);
    }

    @PostMapping
    public ResponseEntity<Problem> createProblem(@Valid @RequestBody ProblemRequest request) {
        return ResponseEntity.ok(problemService.createProblem(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Problem> updateProblem(@PathVariable Long id, @Valid @RequestBody ProblemRequest request) {
        return ResponseEntity.ok(problemService.updateProblem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProblem(@PathVariable Long id) {
        problemService.deleteProblem(id);
        return ResponseEntity.ok(Map.of("message", "Problem deleted successfully"));
    }
}
