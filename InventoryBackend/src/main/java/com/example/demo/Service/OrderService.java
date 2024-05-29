package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Repository.HistoryRepository;
import com.example.demo.Repository.OrderRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.TrackingRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private TrackingRepository trackingRepository;
    @Autowired
    private HistoryRepository trackingHistoryRepository;
    @PersistenceContext
    private EntityManager entityManager;
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

                Tracking tracking = trackingRepository.findByProductId(product.getProductId());
                if (tracking != null) {
                    if (tracking.getQuantityDB() < detail.getQuantity()) {
                        throw new IllegalArgumentException("Insufficient quantity in stock for product: " + product.getProductName() +
                                "\nStock remain are " + tracking.getQuantityDB());
                    }
                    int oldQuantityDB = tracking.getQuantityDB();
                    tracking.setEmpId(authentication.getName());
                    tracking.setQuantityDB(tracking.getQuantityDB() - detail.getQuantity());
                    trackingRepository.save(tracking);

                    saveTrackingHistory(tracking, oldQuantityDB, tracking.getQuantityDB(), authentication.getName());
                } else {
                    throw new IllegalArgumentException("Tracking record not found for product: " + product.getProductName());
                }
            }
        }
        newOrder.setPrices(order.getTotalPrice());
        newOrder.setPaymentMethod(order.getPaymentMethod());
        return orderRepository.save(newOrder);
    }
//    public List<Orders> getAllOrders() {
//        List<Orders> orderList = new ArrayList<>();
//        orderRepository.findAll().forEach(orderList::add);
//        return orderList;
//    }
    @Transactional
    public List<Orders> getAllOrders(String searchKey) {
        if (searchKey == null || searchKey.isEmpty()) {
            return orderRepository.findAll();
        } else {
            return orderRepository.findAll().stream()
                    .filter(order -> order.getEmpId().contains(searchKey) ||
                            order.getPaymentMethod().contains(searchKey) ||
                            order.getOrderDetails().stream()
                                    .anyMatch(detail -> detail.getProduct().getProductName().contains(searchKey)))
                    .collect(Collectors.toList());
        }
    }
    public String deleteOrder(Integer orderId) {
        orderRepository.deleteById(orderId);
        return "Order " + orderId + " has been deleted.";
    }
//    public Orders getOrderById(Integer orderId) {
//        return orderRepository.findById(orderId).orElseThrow();
//    }
    @Transactional
    public Orders getOrderById(Integer orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found!"));

        // Manually initialize the proxy Product entities
        for (OrderDetail detail : order.getOrderDetails()) {
            Hibernate.initialize(detail.getProduct());
        }

        return order;
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
                OrderDetail mergedOrderDetail = entityManager.merge(orderDetail);
                currentOrder.getOrderDetails().add(mergedOrderDetail);

                Tracking tracking = trackingRepository.findByProductId(product.getProductId());
                if (tracking != null) {
                    if (tracking.getQuantityDB() < orderDetail.getQuantity()) {
                        throw new IllegalArgumentException("Insufficient quantity in stock for product: " + product.getProductName() +
                        "\nStock remain are " + tracking.getQuantityDB());
                    }
                    int oldQuantityDB = tracking.getQuantityDB();
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                    tracking.setEmpId(authentication.getName());
                    tracking.setQuantityDB(tracking.getQuantityDB() - orderDetail.getQuantity());
                    trackingRepository.save(tracking);

                    saveTrackingHistory(tracking, oldQuantityDB, tracking.getQuantityDB(), tracking.getEmpId());
                } else {
                    throw new IllegalArgumentException("Tracking record not found for product: " + product.getProductName());
                }
            }
        }

        currentOrder.setPrices(newOrder.getTotalPrice());

        currentOrder.setPaymentMethod(newOrder.getPaymentMethod());

        return orderRepository.save(currentOrder);
    }
    public Integer totalExportProducts(Integer productId) {
        List<Orders> allOrders = orderRepository.findAll();
        int totalQuantity = 0;

        for (Orders order : allOrders) {
            for (OrderDetail detail : order.getOrderDetails()) {
                if (detail.getProduct().getProductId().equals(productId)) {
                    totalQuantity += detail.getQuantity();
                }
            }
        }

        return totalQuantity;
    }
    private void saveTrackingHistory(Tracking tracking, int oldQuantityDB, int newQuantityDB, String empId) {
        TrackingHistory history = new TrackingHistory();
        history.setTrackingId(tracking.getTrackingId());
        history.setProductId(tracking.getProductId());
        history.setOldQuantityDB(oldQuantityDB);
        history.setNewQuantityDB(newQuantityDB);
        history.setEmpId(empId);
        history.setChangeAt(new Date());
        trackingHistoryRepository.save(history);
    }
}
