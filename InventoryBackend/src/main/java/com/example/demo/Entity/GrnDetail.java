package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrnDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer grnDetailId;
    @ManyToOne
    @JoinColumn(name = "grnId")
    @JsonBackReference
    private GoodReceivedNote note;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    private Integer quantity;
    private Double price;

    public Double getGrnPrice() {
        return product.getProductPrice() * quantity;
    }
}
