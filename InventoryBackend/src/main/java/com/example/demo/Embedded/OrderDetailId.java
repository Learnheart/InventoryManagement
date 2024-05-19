//package com.example.demo.Embedded;
//
//import jakarta.persistence.Embeddable;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.io.Serializable;
//import java.util.Objects;
//
//@Embeddable
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//public class OrderDetailId implements Serializable {
//    private Integer orderId;
//    private Integer productId;
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        OrderDetailId that = (OrderDetailId) o;
//        return Objects.equals(orderId, that.orderId) &&
//                Objects.equals(productId, that.productId);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(orderId, productId);
//    }
//}
