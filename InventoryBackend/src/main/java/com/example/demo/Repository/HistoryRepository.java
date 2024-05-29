package com.example.demo.Repository;

import com.example.demo.Entity.TrackingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<TrackingHistory, Integer> {
    List<TrackingHistory> findByTrackingId(Integer trackingId);
    void deleteByTrackingId(Integer trackingId);
}
