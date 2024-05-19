package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoodReceivedNote {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "grnId_generator")
    @SequenceGenerator(name = "grnId_generator", sequenceName = "grn_seq", allocationSize = 1)
    private Integer grnId;
    @Temporal(TemporalType.DATE)
    private Date importDate;
    private String empId;
    @OneToMany(mappedBy = "note", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GrnDetail> grnDetails;
    private Double totalPrice;
    @PrePersist
    protected void onCreate() {
        importDate = new Date();
    }
    public Double getTotalPrice() {
        return grnDetails.stream()
                .mapToDouble(GrnDetail::getGrnPrice)
                .sum();
    }
}
