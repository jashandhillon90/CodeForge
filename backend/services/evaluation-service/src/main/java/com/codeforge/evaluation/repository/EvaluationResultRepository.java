package com.codeforge.evaluation.repository;

import com.codeforge.evaluation.model.EvaluationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationResultRepository extends JpaRepository<EvaluationResult, Long> {
}
