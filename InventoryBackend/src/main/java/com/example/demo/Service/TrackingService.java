package com.example.demo.Service;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.Tracking;
import com.example.demo.Repository.TrackingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.sound.midi.Track;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TrackingService {
    @Autowired
    private TrackingRepository repository;
    @Autowired
    private GrnService grnService;
    @Autowired
    private OrderService orderService;
    @Transactional
    public Integer productQuantity(Integer productId) {
        int totalImportQuantity = grnService.totalImportProducts(productId);
        int totalExportQuantity = orderService.totalExportProducts(productId);
        return totalImportQuantity - totalExportQuantity;
    }
    @Transactional
    public Tracking createTracking(Tracking tracking) {
        Tracking newTracking = new Tracking();
        newTracking.setTrackingAt(new Date());
        newTracking.setProductId(tracking.getProductId());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        newTracking.setEmpId(authentication.getName());
        newTracking.setQuantityDB(productQuantity(tracking.getProductId()));
        newTracking.setQuantityTracking(tracking.getQuantityTracking());

        return repository.save(newTracking);
    }
    public List<Tracking> getAllTracking() {
        List<Tracking> trackingList = new ArrayList<>();
            repository.findAll().forEach(trackingList::add);
            return trackingList;
    }
    public String deleteTracking(Integer trackingId) {
        repository.deleteById(trackingId);
        return "Tracking ID " + trackingId + "has been deleted.";
    }
    @Transactional
    public Tracking updateTracking(Integer trackingId, Tracking tracking) {
        Tracking existingTracking = repository.findById(trackingId)
                .orElseThrow(() -> new IllegalArgumentException("Tracking record not found"));

        existingTracking.setTrackingAt(new Date());
        existingTracking.setProductId(tracking.getProductId());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        existingTracking.setEmpId(authentication.getName());
        existingTracking.setQuantityDB(productQuantity(tracking.getProductId()));
        existingTracking.setQuantityTracking(tracking.getQuantityTracking());

        return repository.save(existingTracking);
    }
}
