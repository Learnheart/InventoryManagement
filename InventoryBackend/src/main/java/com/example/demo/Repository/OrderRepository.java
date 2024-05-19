package com.example.demo.Repository;

import com.example.demo.Entity.Orders;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {
    @EntityGraph(attributePaths = "orderDetails")
    Optional<Orders> findById(Integer orderId);
}
