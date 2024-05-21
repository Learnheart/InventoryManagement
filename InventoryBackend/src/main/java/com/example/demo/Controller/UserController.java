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
//    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<User>> userList() {
        List<User> userList = userRepository.findAll();
        return ResponseEntity.ok(userList);
    }

    @GetMapping("/manager/getUser/{empId}")
    public ResponseEntity<User> getUser(@PathVariable Integer empId) {
        Optional<User> user = userRepository.findById(empId);
        if (user.isPresent()) {
            return new ResponseEntity<User>(user.get(), HttpStatus.FOUND);
        }else {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/manager/update/{empId}")
    public String updateUser(@PathVariable Integer empId, @RequestBody User user) {
        Optional<User> emp = userRepository.findById(empId);
        if (emp.isPresent()) {
            User existedUser = emp.get();
            existedUser.setEmpName(user.getEmpName());
            existedUser.setPhoneNumber(user.getPhoneNumber());
            existedUser.setAddress(user.getAddress());
            existedUser.setRole(user.getRole());
            userRepository.save(existedUser);
            return "User with ID" + empId + "updated successfully!";
        }else {
            return "User" + empId + "Not found";
        }
    }
    @DeleteMapping("/manager/delete/{empId}")
    public String deleteUser(@PathVariable Integer empId) {
        userRepository.deleteById(empId);
        return "User " + empId + "deleted successfully!";
    }

    @GetMapping("/public/id")
    public String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        System.out.println(authentication.getDetails());
        System.out.println(authentication.getName());
        return authentication.getName();
    }

    @GetMapping("/staff")
    public ResponseEntity<String> welcomeStaff() {
        return ResponseEntity.ok("Only available for inventory staff");
    }
    @GetMapping("/sales")
    @PostMapping("hasRole('SALES')")
    public ResponseEntity<String> welcomeSales() {
        return ResponseEntity.ok("Only available for inventory sales");
    }
    @GetMapping("/manager")
    public ResponseEntity<String> welcomeManager() {
        return ResponseEntity.ok("Only available for manager");
    }
}
