package com.example.demo.Controller;

import com.example.demo.Entity.Tracking;
import com.example.demo.Entity.TrackingHistory;
import com.example.demo.Service.TrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sound.midi.Track;
import java.util.List;

@RestController
public class TrackingController {
    @Autowired
    private TrackingService trackingService;

    @GetMapping("/public/getProductQuantity/{productId}")
    public ResponseEntity<Integer> getTotalProductQuantities(@PathVariable Integer productId) {
        return ResponseEntity.ok(trackingService.productQuantity(productId));
    }
//    @PostMapping("/staff/createTracking")
//    public ResponseEntity<Tracking> createTracking(@RequestBody Tracking tracking) {
//        return ResponseEntity.ok(trackingService.createTracking(tracking));
//    }
    @PutMapping("/staff/updateTracking/{trackingId}")
    public ResponseEntity<Tracking> updateTracking(@PathVariable Integer trackingId, @RequestBody Tracking tracking) {
        return ResponseEntity.ok(trackingService.updateTracking(trackingId, tracking));
    }
    @DeleteMapping("/staff/deleteTracking/{trackingId}")
    public ResponseEntity<String> deleteTracking(@PathVariable Integer trackingId) {
        return ResponseEntity.ok(trackingService.deleteTracking(trackingId));
    }
    @GetMapping("/staff/trackingHistory")
    public ResponseEntity<List<TrackingHistory>> trackingHistory() {
        return ResponseEntity.ok(trackingService.trackingHistory());
    }
    @GetMapping("/public/listTracking")
    public ResponseEntity<List<Tracking>> trackingList() {
        return ResponseEntity.ok(trackingService.getAllTracking());
    }
}
