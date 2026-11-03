package com.codeforge.analytics.controller;

import com.codeforge.analytics.model.AnalyticsSnapshot;
import com.codeforge.analytics.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    public ResponseEntity<List<AnalyticsSnapshot>> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getRecentSnapshots());
    }
}
