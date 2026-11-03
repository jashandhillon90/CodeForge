package com.codeforge.analytics.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_snapshots")
public class AnalyticsSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String metric;

    @Column(nullable = false)
    private Double value;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public AnalyticsSnapshot() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMetric() { return metric; }
    public void setMetric(String metric) { this.metric = metric; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
