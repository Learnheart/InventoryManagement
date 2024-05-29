package com.example.demo.Service;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.Tracking;
import com.example.demo.Entity.TrackingHistory;
import com.example.demo.Repository.HistoryRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.TrackingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;
    @Autowired
    private TrackingRepository trackingRepository;
    @Autowired
    private HistoryRepository trackingHistoryRepository;

    public List<Product> getAllProduct() {
        List<Product> productList = new ArrayList<>();
        repository.findAll().forEach(productList::add);
        return productList;
    }

    public Optional<Product> getProductById(Integer productId) {
        return repository.findById(productId);
    }

    public Product addNewProduct(Product product) {
        Product newProduct = repository.save(product);
        createTrackingRecord(newProduct);

        return newProduct;
    }
    private void createTrackingRecord(Product product) {
        Tracking tracking = new Tracking();
        tracking.setTrackingAt(new Date());
        tracking.setProductId(product.getProductId());
        tracking.setEmpId(null);
        tracking.setQuantityDB(0);
        tracking.setQuantityTracking(0);
        trackingRepository.save(tracking);

        saveTrackingHistory(tracking, 0, tracking.getQuantityDB(), "Default");
    }

    @Transactional
    public String deleteProduct(Integer productId) {
        List<Tracking> trackings = trackingRepository.listTrackingByProductId(productId); // Using the custom query method
        for (Tracking tracking : trackings) {
            trackingHistoryRepository.deleteByTrackingId(tracking.getTrackingId());
            trackingRepository.delete(tracking);
        }
        repository.deleteById(productId);
        return "Product with ID " + productId + " and its tracking records deleted successfully!";
    }

    public String updateProduct(Integer productId, Product product) {
        Optional<Product> optionalProduct = repository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product existedProduct = optionalProduct.get();
            existedProduct.setProductName(product.getProductName());
            existedProduct.setCategory(product.getCategory());
            existedProduct.setProductPrice(product.getProductPrice());
            repository.save(existedProduct);
            return "Product with ID " + productId + " updated successfully!";
        }else {
            return "Product " + product + " not found";
        }
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
