package com.codeforge.analytics.repository;

import com.codeforge.analytics.model.AnalyticsSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalyticsSnapshotRepository extends JpaRepository<AnalyticsSnapshot, Long> {
}
