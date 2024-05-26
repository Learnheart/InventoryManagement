package com.example.demo.Repository;

import com.example.demo.Entity.TrackingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<TrackingHistory, Integer> {
}
