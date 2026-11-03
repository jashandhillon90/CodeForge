package com.codeforge.analytics.service;

import com.codeforge.analytics.model.AnalyticsSnapshot;
import com.codeforge.analytics.repository.AnalyticsSnapshotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    private final AnalyticsSnapshotRepository analyticsSnapshotRepository;

    public AnalyticsService(AnalyticsSnapshotRepository analyticsSnapshotRepository) {
        this.analyticsSnapshotRepository = analyticsSnapshotRepository;
    }

    public List<AnalyticsSnapshot> getRecentSnapshots() {
        return analyticsSnapshotRepository.findAll();
    }
}
