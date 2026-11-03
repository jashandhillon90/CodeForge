package com.codeforge.contest.controller;

import com.codeforge.contest.dto.ContestRequest;
import com.codeforge.contest.model.Contest;
import com.codeforge.contest.service.ContestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contests")
public class ContestController {

    private final ContestService contestService;

    public ContestController(ContestService contestService) {
        this.contestService = contestService;
    }

    @GetMapping
    public List<Contest> getAllContests() {
        return contestService.getAllContests();
    }

    @GetMapping("/{id}")
    public Contest getContestById(@PathVariable Long id) {
        return contestService.getContestById(id);
    }

    @PostMapping
    public ResponseEntity<Contest> createContest(@Valid @RequestBody ContestRequest request) {
        return ResponseEntity.ok(contestService.createContest(request));
    }

    @PostMapping("/{id}/register")
    public ResponseEntity<Contest> registerParticipant(@PathVariable Long id) {
        return ResponseEntity.ok(contestService.registerParticipant(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteContest(@PathVariable Long id) {
        contestService.getContestById(id);
        contestService.getContestById(id);
        return ResponseEntity.ok(Map.of("message", "Contest removed"));
    }
}
