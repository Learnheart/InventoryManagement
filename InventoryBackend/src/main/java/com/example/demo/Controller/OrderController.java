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

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/sale/createOrder")
    public ResponseEntity<Orders> createOrder(@RequestBody Orders order) {
        Orders newOrder = orderService.createOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }
    @GetMapping("public/orderList")
    public ResponseEntity<List<Orders>> orderList() {
        return ResponseEntity.ok(orderService.getAllOrders());
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
    @GetMapping("/public/orderDetail/{orderId}")
    public ResponseEntity<Orders> orderDetail(@PathVariable Integer orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }
}
