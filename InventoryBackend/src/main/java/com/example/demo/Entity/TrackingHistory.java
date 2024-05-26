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
@NoArgsConstructor
@AllArgsConstructor
public class TrackingHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer trackingId;
    private Integer productId;
    private Integer oldQuantityDB;
    private Integer newQuantityDB;
    private String empId;
    @Temporal(TemporalType.DATE)
    private Date changeAt;

    @PrePersist
    protected void onCreate() {
        this.changeAt = new Date();
    }
}
