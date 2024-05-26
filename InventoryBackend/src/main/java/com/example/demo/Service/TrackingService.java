package com.example.demo.Service;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.Tracking;
import com.example.demo.Entity.TrackingHistory;
import com.example.demo.Repository.HistoryRepository;
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
    @Autowired
    private HistoryRepository trackingHistoryRepository;
    @Transactional
    public Integer productQuantity(Integer productId) {
        int totalQuantity = 0;
        int totalImportQuantity = grnService.totalImportProducts(productId);
        int totalExportQuantity = orderService.totalExportProducts(productId);
        totalQuantity = totalImportQuantity - totalExportQuantity;
        return totalQuantity;
    }
//    @Transactional
//    public Tracking createTracking(Tracking tracking) {
//        Tracking newTracking = new Tracking();
//        newTracking.setTrackingAt(new Date());
//        newTracking.setProductId(tracking.getProductId());
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        newTracking.setEmpId(authentication.getName());
//        newTracking.setQuantityDB(productQuantity(tracking.getProductId()));
//        newTracking.setQuantityTracking(tracking.getQuantityTracking());
//
//        return repository.save(newTracking);
//    }

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
        int oldQuantityDB  = existingTracking.getQuantityDB();
        existingTracking.setTrackingAt(new Date());
        existingTracking.setProductId(tracking.getProductId());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        existingTracking.setEmpId(authentication.getName());
        existingTracking.setQuantityDB(productQuantity(tracking.getProductId()));
        existingTracking.setQuantityTracking(tracking.getQuantityTracking());

        saveTrackingHistory(existingTracking, oldQuantityDB, existingTracking.getQuantityDB(), existingTracking.getEmpId());
        return repository.save(existingTracking);
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
    public List<TrackingHistory> trackingHistory() {
        List<TrackingHistory> trackingHistories = new ArrayList<>();
        trackingHistoryRepository.findAll().forEach(trackingHistories::add);
        return trackingHistories;
    }
}
