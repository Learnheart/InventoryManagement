package com.example.demo.Controller;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping({"/manager/userList"})
    public ResponseEntity<List<User>> userList() {
        List<User> userList = userRepository.findAll();
        return ResponseEntity.ok(userList);
    }

    @GetMapping("/getUser/{empId}")
    public ResponseEntity<User> getUser(@PathVariable Integer empId) {
        Optional<User> user = userRepository.findById(empId);
        if (user.isPresent()) {
            return new ResponseEntity<User>(user.get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateUser/{empId}")
    public String updateUser(@PathVariable Integer empId, @RequestBody User user) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String empId = authentication.getName();
        Optional<User> optionalUser = userRepository.findById(empId);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setEmpName(user.getEmpName());
            existingUser.setPhoneNumber(user.getPhoneNumber());
            existingUser.setAddress(user.getAddress());
            existingUser.setRole(user.getRole());
            userRepository.save(existingUser);
            return "User with ID " + existingUser.getEmpId() + " updated successfully!";
        } else {
            return "User not found";
        }
    }
    @DeleteMapping("/manager/delete/{empId}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer empId) {
        userRepository.deleteById(empId);
        return ResponseEntity.ok("User " + empId + "deleted successfully!");
    }

    @GetMapping("/id")
    public ResponseEntity<String> getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        System.out.println(authentication.getDetails());
        System.out.println(authentication.getName());
        return ResponseEntity.ok(authentication.getName());
    }

    @GetMapping("/staff")
    public ResponseEntity<String> welcomeStaff() {
        return ResponseEntity.ok("Only available for inventory staff");
    }
    @GetMapping("/sales")
    public ResponseEntity<String> welcomeSales() {
        return ResponseEntity.ok("Only available for inventory sales");
    }
    @GetMapping("/manager")
    public ResponseEntity<String> welcomeManager() {
        return ResponseEntity.ok("Only available for manager");
    }
}
