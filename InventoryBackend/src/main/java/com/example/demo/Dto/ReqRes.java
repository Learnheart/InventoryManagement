package com.example.demo.Dto;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private Integer empId;
    private String empName;
    private String phoneNumber;
    private String address;
    private String role;
    private String password;
    private List<Product> products;
    private User user;
}
