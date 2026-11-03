package com.codeforge.problem.service;

import com.codeforge.problem.dto.ProblemRequest;
import com.codeforge.problem.model.Problem;
import com.codeforge.problem.repository.ProblemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public Problem getProblemById(Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found: " + id));
    }

    @Transactional
    public Problem createProblem(ProblemRequest request) {
        Problem problem = new Problem();
        problem.setTitle(request.getTitle().trim());
        problem.setDifficulty(request.getDifficulty().trim());
        problem.setTopic(request.getTopic().trim());
        problem.setAcceptance(request.getAcceptance() == null ? 0 : request.getAcceptance());
        problem.setSolved(request.getSolved() == null ? 0 : request.getSolved());
        problem.setDescription(request.getDescription());
        problem.setExamples(request.getExamples());
        problem.setConstraints(request.getConstraints());
        problem.setStarterCode(request.getStarterCode());
        return problemRepository.save(problem);
    }

    @Transactional
    public Problem updateProblem(Long id, ProblemRequest request) {
        Problem problem = getProblemById(id);
        if (request.getTitle() != null) problem.setTitle(request.getTitle().trim());
        if (request.getDifficulty() != null) problem.setDifficulty(request.getDifficulty().trim());
        if (request.getTopic() != null) problem.setTopic(request.getTopic().trim());
        if (request.getAcceptance() != null) problem.setAcceptance(request.getAcceptance());
        if (request.getSolved() != null) problem.setSolved(request.getSolved());
        if (request.getDescription() != null) problem.setDescription(request.getDescription());
        if (request.getExamples() != null) problem.setExamples(request.getExamples());
        if (request.getConstraints() != null) problem.setConstraints(request.getConstraints());
        if (request.getStarterCode() != null) problem.setStarterCode(request.getStarterCode());
        return problemRepository.save(problem);
    }

    @Transactional
    public void deleteProblem(Long id) {
        Problem problem = getProblemById(id);
        problemRepository.delete(problem);
    }
}
