package com.codeforge.evaluation.controller;

import com.codeforge.evaluation.model.EvaluationResult;
import com.codeforge.evaluation.repository.EvaluationResultRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
public class EvaluationController {

    private final EvaluationResultRepository evaluationResultRepository;

    public EvaluationController(EvaluationResultRepository evaluationResultRepository) {
        this.evaluationResultRepository = evaluationResultRepository;
    }

    @GetMapping
    public List<EvaluationResult> getAllEvaluations() {
        return evaluationResultRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EvaluationResult> getById(@PathVariable Long id) {
        return evaluationResultRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
