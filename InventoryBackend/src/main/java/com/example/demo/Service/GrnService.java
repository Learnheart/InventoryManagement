package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Repository.GrnRepository;
import com.example.demo.Repository.HistoryRepository;
import com.example.demo.Repository.TrackingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class GrnService {
    @Autowired
    private GrnRepository grnRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private TrackingRepository trackingRepository;
    @Autowired
    private HistoryRepository trackingHistoryRepository;

    public GoodReceivedNote createNewNote(GoodReceivedNote note) {
        GoodReceivedNote newNote = new GoodReceivedNote();
        newNote.setImportDate(new Date());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        authentication.getDetails();
        newNote.setEmpId(authentication.getName());

        if (note.getGrnDetails() != null) {
            newNote.setGrnDetails(new ArrayList<>());
            for (GrnDetail grnDetail : note.getGrnDetails()) {
                Product product = productService.getProductById(grnDetail.getProduct().getProductId()).orElseThrow(
                        () -> new IllegalArgumentException("Product not found")
                );
                grnDetail.setProduct(product);
                grnDetail.setNote(newNote);
                grnDetail.setPrice(grnDetail.getGrnPrice());
                newNote.getGrnDetails().add(grnDetail);

                Tracking tracking = trackingRepository.findByProductId(product.getProductId());
                if (tracking != null) {
                    tracking.setEmpId(authentication.getName());
                    int oldQuantityDB = tracking.getQuantityDB();
                    tracking.setQuantityDB(tracking.getQuantityDB() + grnDetail.getQuantity());
                    trackingRepository.save(tracking);

                    saveTrackingHistory(tracking, oldQuantityDB, tracking.getQuantityDB(), authentication.getName());
                } else {
                    throw new IllegalArgumentException("Tracking record not found for product: " + product.getProductName());
                }
            }
        }
        newNote.setTotalPrice(note.getTotalPrice());
        return grnRepository.save(newNote);
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

    public List<GoodReceivedNote> getAllGrn() {
        List<GoodReceivedNote> grnList = new ArrayList<>();
        grnRepository.findAll().forEach(grnList::add);
        return grnList;
    }
    public String deleteGrn(Integer grnId) {
        grnRepository.deleteById(grnId);
        return "Note with ID " + grnId + " deleted successfully!";
    }
    public GoodReceivedNote getNoteById(Integer grnId) {
        return grnRepository.findById(grnId).orElseThrow();
    }
    @Transactional
    public GoodReceivedNote updateGrn(Integer noteId, GoodReceivedNote newNote) {
        GoodReceivedNote currentNote = getNoteById(noteId);
        currentNote.getGrnDetails().clear();

        if (newNote.getGrnDetails() != null) {
            for (GrnDetail grnDetail : newNote.getGrnDetails()) {
                Product product = productService.getProductById(grnDetail.getProduct().getProductId()).orElseThrow(
                        () -> new IllegalArgumentException("Product not found!")
                );
                grnDetail.setProduct(product);
                grnDetail.setNote(currentNote);
                grnDetail.setPrice(grnDetail.getGrnPrice());
                currentNote.getGrnDetails().add(grnDetail);

                Tracking tracking = trackingRepository.findByProductId(product.getProductId());
                if (tracking != null) {
                    int oldQuantityDB = tracking.getQuantityDB();
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                    tracking.setEmpId(authentication.getName());
                    tracking.setQuantityDB(tracking.getQuantityDB() + grnDetail.getQuantity());
                    trackingRepository.save(tracking);

                    saveTrackingHistory(tracking, oldQuantityDB, tracking.getQuantityDB(), authentication.getName());
                } else {
                    throw new IllegalArgumentException("Tracking record not found for product: " + product.getProductName());
                }
            }
        }

        currentNote.setTotalPrice(newNote.getTotalPrice());
        return grnRepository.save(currentNote);
    }
    public Integer totalImportProducts(Integer productId) {
        List<GoodReceivedNote> allImports = grnRepository.findAll();
        int totalQuantity = 0;

        for (GoodReceivedNote note : allImports) {
            for (GrnDetail detail : note.getGrnDetails()) {
                if (detail.getProduct().getProductId().equals(productId)) {
                    totalQuantity += detail.getQuantity();
                }
            }
        }

        return totalQuantity;
    }
}
