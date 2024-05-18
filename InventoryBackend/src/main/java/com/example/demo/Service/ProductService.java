package com.example.demo.Service;

import com.example.demo.Entity.Product;
import com.example.demo.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public List<Product> getAllProduct() {
        List<Product> productList = new ArrayList<>();
        repository.findAll().forEach(productList::add);
        return productList;
    }

    public Optional<Product> getProductById(Integer productId) {
        return repository.findById(productId);
    }

    public Product addNewProduct(Product product) {
        return repository.save(product);
    }

    public String deleteProduct(Integer productId) {
        repository.deleteById(productId);
        return "Product with ID " + productId + " deleted successfully!";
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
}
