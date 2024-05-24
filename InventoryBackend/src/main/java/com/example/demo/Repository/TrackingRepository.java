package com.example.demo.Repository;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrackingRepository extends JpaRepository<Tracking, Integer> {
    Tracking findByProductId(Integer productId);
}
