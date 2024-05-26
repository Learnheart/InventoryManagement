package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer trackingId;
    @Temporal(TemporalType.DATE)
    private Date trackingAt;
    private Integer productId;
    private String empId;
    private Integer quantityDB;
    private Integer quantityTracking;

    @PrePersist
    protected void onCreate() {
        this.trackingAt = new Date();
    }
}
