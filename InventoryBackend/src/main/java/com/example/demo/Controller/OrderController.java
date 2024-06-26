package com.example.demo.Controller;

import com.example.demo.Entity.OrderDetail;
import com.example.demo.Entity.Orders;
import com.example.demo.Service.OrderService;
import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/sale/createOrder")
    public ResponseEntity<Orders> createOrder(@RequestBody Orders order) {
        Orders newOrder = orderService.createOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }
    @GetMapping("/orderList")
    public ResponseEntity<List<Orders>> getAllOrders(@RequestParam(value = "searchKey", required = false) String searchKey) {
        return ResponseEntity.ok(orderService.getAllOrders(searchKey));
    }
    @DeleteMapping("/manager/deleteOrder/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Integer orderId) {
        return ResponseEntity.ok(orderService.deleteOrder(orderId)) ;
    }

    @PutMapping("/sale/updateOrder/{orderId}")
    public ResponseEntity<Orders> updateOrder(@PathVariable Integer orderId, @RequestBody Orders order) {
//        Orders updateOrder = orderService.updateOrder(orderId, order);
        return ResponseEntity.ok(orderService.updateOrder(orderId, order));
    }
    @GetMapping("/orderDetail/{orderId}")
    public ResponseEntity<Orders> orderDetail(@PathVariable Integer orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }
    @GetMapping("/productQuantities/{productId}")
    public Integer getProductQuantitiesFromOrders(@PathVariable Integer productId) {
        return orderService.totalExportProducts(productId);
    }
}
