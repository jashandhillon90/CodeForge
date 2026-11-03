package com.codeforge.submission.service;

import com.codeforge.submission.dto.SubmissionRequest;
import com.codeforge.submission.model.Submission;
import com.codeforge.submission.repository.SubmissionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubmissionService {

    private static final Logger log = LoggerFactory.getLogger(SubmissionService.class);

    private final SubmissionRepository submissionRepository;
    private final RabbitTemplate rabbitTemplate;

    @Value("${app.events.submission-created:submission.created}")
    private String submissionCreatedQueue;

    public SubmissionService(SubmissionRepository submissionRepository, RabbitTemplate rabbitTemplate) {
        this.submissionRepository = submissionRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public Submission getSubmissionById(Long id) {
        return submissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Submission not found: " + id));
    }

    @Transactional
    public Submission createSubmission(SubmissionRequest request) {
        Submission submission = new Submission();
        submission.setProblemId(request.getProblemId());
        submission.setUserId(request.getUserId());
        submission.setLanguage(request.getLanguage());
        submission.setCode(request.getCode());
        submission.setStatus("PENDING");

        Submission saved = submissionRepository.save(submission);
        Map<String, Object> payload = new HashMap<>();
        payload.put("submissionId", saved.getId());
        payload.put("problemId", saved.getProblemId());
        payload.put("userId", saved.getUserId());
        payload.put("language", saved.getLanguage());
        payload.put("code", saved.getCode());

        try {
            rabbitTemplate.convertAndSend(submissionCreatedQueue, payload);
        } catch (Exception ex) {
            log.warn("Submission event publish skipped because RabbitMQ is unavailable: {}", ex.getMessage());
        }

        return saved;
    }
}
