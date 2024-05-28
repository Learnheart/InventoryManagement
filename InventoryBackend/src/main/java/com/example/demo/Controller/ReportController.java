package com.example.demo.Controller;

import com.example.demo.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
public class ReportController {
    @Autowired
    private ReportService reportService;
    @GetMapping("/public/total-import")
    public ResponseEntity<Map<String, Integer>> totalImport() {
        return ResponseEntity.ok(reportService.totalImportProducts());
    }
    @GetMapping("/public/total-export")
    public ResponseEntity<Map<String, Integer>> totalExport() {
        return ResponseEntity.ok(reportService.totalExportProducts());
    }
    @GetMapping("/public/transaction-report")
    public ResponseEntity<Map<String, Pair<Integer, Integer>>> transactionReport() {
        return ResponseEntity.ok(reportService.totalProductQuantities());
    }

//    test api: http://localhost:4000/public/monthly-report?startDate=2024-05-20&endDate=2024-05-25
    @GetMapping("/public/monthly-report")
    public ResponseEntity<Map<String, Pair<Integer, Integer>>> reportInTime(
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return ResponseEntity.ok(reportService.reportInTimeRange(startDate, endDate));
    }
}
