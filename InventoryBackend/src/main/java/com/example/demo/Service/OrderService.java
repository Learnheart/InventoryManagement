package com.example.demo.Service;

import com.example.demo.Entity.OrderDetail;
import com.example.demo.Entity.Orders;
import com.example.demo.Entity.Product;
import com.example.demo.Repository.OrderRepository;
import com.example.demo.Repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;
    @Transactional
    public Orders createOrder(Orders order) {
        Orders newOrder = new Orders();
        newOrder.setExportDate(new Date());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        newOrder.setEmpId(authentication.getName());
        newOrder.setOrderDetails(new ArrayList<>());

        double totalPrice = 0.0;
        if (order.getOrderDetails() != null) {
            for (OrderDetail detail : order.getOrderDetails()) {
                Product product = productService.getProductById(detail.getProduct().getProductId()).orElseThrow(
                        () -> new IllegalArgumentException("Product not found")
                );
                detail.setProduct(product);
                detail.setOrder(newOrder);
                detail.setPrice(detail.detailPrice());
                newOrder.getOrderDetails().add(detail);
            }
        }
        newOrder.setPrices(order.getTotalPrice());
        newOrder.setPaymentMethod(order.getPaymentMethod());
        return orderRepository.save(newOrder);
    }
    public List<Orders> getAllOrders() {
        List<Orders> orderList = new ArrayList<>();
        orderRepository.findAll().forEach(orderList::add);
        return orderList;
    }
    public String deleteOrder(Integer orderId) {
        orderRepository.deleteById(orderId);
        return "Order " + orderId + " has been deleted.";
    }
    public Orders getOrderById(Integer orderId) {
        return orderRepository.findById(orderId).orElseThrow();
    }
    @Transactional
    public Orders updateOrder(Integer orderId, Orders newOrder) {
        Orders currentOrder = getOrderById(orderId);
        currentOrder.getOrderDetails().clear();

        if (newOrder.getOrderDetails() != null) {
            for (OrderDetail orderDetail : newOrder.getOrderDetails()) {
                Product product = productService.getProductById(orderDetail.getProduct().getProductId()).orElseThrow(
                        () -> new IllegalArgumentException("Product not found!")
                );
                orderDetail.setProduct(product);
                orderDetail.setOrder(currentOrder);
                orderDetail.setPrice(orderDetail.detailPrice());
                currentOrder.getOrderDetails().add(orderDetail); // Add the updated order detail
            }
        }

        currentOrder.setPrices(newOrder.getTotalPrice());

        currentOrder.setPaymentMethod(newOrder.getPaymentMethod());

        return orderRepository.save(currentOrder);
    }

}
