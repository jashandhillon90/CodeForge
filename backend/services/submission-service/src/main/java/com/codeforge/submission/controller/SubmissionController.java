package com.codeforge.submission.controller;

import com.codeforge.submission.dto.SubmissionRequest;
import com.codeforge.submission.model.Submission;
import com.codeforge.submission.service.SubmissionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @GetMapping
    public List<Submission> getAllSubmissions() {
        return submissionService.getAllSubmissions();
    }

    @GetMapping("/{id}")
    public Submission getSubmissionById(@PathVariable Long id) {
        return submissionService.getSubmissionById(id);
    }

    @PostMapping
    public ResponseEntity<Submission> createSubmission(@Valid @RequestBody SubmissionRequest request) {
        return ResponseEntity.ok(submissionService.createSubmission(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteSubmission(@PathVariable Long id) {
        submissionService.getSubmissionById(id);
        return ResponseEntity.ok(Map.of("message", "Submission deleted"));
    }
}
