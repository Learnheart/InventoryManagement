package com.example.demo.Controller;

import com.example.demo.Entity.Product;
import com.example.demo.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping({"/products"})
    private ResponseEntity<List<Product>> getProductList() {
        return ResponseEntity.ok(productService.getAllProduct());
    }
    @GetMapping("product/{productId}")
    private ResponseEntity<Product> getProductById(@PathVariable("productId") Integer productId) {
        Optional<Product> product = productService.getProductById(productId);
        if (product.isPresent()) {
            return new ResponseEntity<Product>(product.get(), HttpStatus.FOUND);
        }else {
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("manager/addProduct")
    private ResponseEntity<Product> addNewProduct(@RequestBody Product product){
        Product newProduct = productService.addNewProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }
    @DeleteMapping("manager/deleteProduct/{productId}")
    private ResponseEntity<String> deleteProduct(@PathVariable Integer productId) {
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }
    @PutMapping("manager/updateProduct/{productId}")
    private ResponseEntity<String> updateProduct(@PathVariable Integer productId, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(productId, product));
    }
}

