package com.example.demo.Repository;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackingRepository extends JpaRepository<Tracking, Integer> {
    Tracking findByProductId(Integer productId);
    @Query("SELECT t FROM Tracking t WHERE t.productId = ?1")
    List<Tracking> listTrackingByProductId(Integer productId);
}
