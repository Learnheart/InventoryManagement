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
public class GoodReceivedNote {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "grnId_generator")
    @SequenceGenerator(name = "GrnId_generator", sequenceName = "grn_seq", allocationSize = 1)
    private Integer grnId;
    @Temporal(TemporalType.DATE)
    private Date importDate;
//    @ManyToOne()
//    @JoinColumn(name = "emp_id", referencedColumnName = "empId", nullable = false)
    private String empId;

    @PrePersist
    protected void onCreate() {
        importDate = new Date();
    }
}
