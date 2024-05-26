package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "orderId_generator")
    @SequenceGenerator(name = "orderId_generator", sequenceName = "order_seq", allocationSize = 1)
    private Integer orderId;
    @Temporal(TemporalType.DATE)
    private Date exportDate;
    private String empId;
    private String paymentMethod;
//    @OneToMany(mappedBy = "order")
//    private Set<OrderDetail> orderDetails;
    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderDetail> orderDetails;
    private Double prices;

//    public Double totalPrice() {
//        Double totalPrice = 0.0;
//        int size = orderDetails.size();
//        for (int i = 0; i < size; i++) {
//            totalPrice += orderDetails.get(i).detailPrice();
//        }
//        return totalPrice;
//    }
    public Double getTotalPrice() {
        return orderDetails.stream()
                .mapToDouble(OrderDetail::detailPrice)
                .sum();
    }
    @PrePersist
    protected void exportDate() {
        exportDate = new Date();
    }
}
