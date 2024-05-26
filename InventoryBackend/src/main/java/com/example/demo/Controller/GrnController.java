package com.example.demo.Controller;

import com.example.demo.Entity.GoodReceivedNote;
import com.example.demo.Service.GrnService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GrnController {
    @Autowired
    private GrnService grnService;

    @PostMapping("/staff/createNote")
    public ResponseEntity<GoodReceivedNote> createNewNote(@RequestBody GoodReceivedNote note) {
        return ResponseEntity.ok(grnService.createNewNote(note));
    }
    @DeleteMapping("manager/deleteGrn/{grnId}")
    private ResponseEntity<String> deleteProduct(@PathVariable Integer grnId) {
        return ResponseEntity.ok(grnService.deleteGrn(grnId));
    }
    @GetMapping("public/grnList")
    private ResponseEntity<List<GoodReceivedNote>> grnList() {
        return ResponseEntity.ok(grnService.getAllGrn());
    }
    @PutMapping("/staff/updateGrn/{grnId}")
    public ResponseEntity<GoodReceivedNote> updateGrn(@PathVariable Integer grnId, @RequestBody GoodReceivedNote note) {
        return ResponseEntity.ok(grnService.updateGrn(grnId, note));
    }
    @GetMapping("/public/totalImportProducts/{productId}")
    public ResponseEntity<Integer> totalImportProducts(@PathVariable Integer productId) {
        return ResponseEntity.ok(grnService.totalImportProducts(productId));
    }
}

