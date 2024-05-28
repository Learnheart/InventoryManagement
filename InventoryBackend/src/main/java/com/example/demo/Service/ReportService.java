package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Repository.GrnRepository;
import com.example.demo.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    @Autowired
    private GrnRepository grnRepository;
    @Autowired
    private OrderRepository orderRepository;

    public Map<String, Integer> totalImportProducts() {
        List<GoodReceivedNote> allImports = grnRepository.findAll();
        Map<String, Integer> totalImportsMap = new HashMap<>();

        for (GoodReceivedNote note : allImports) {
            for (GrnDetail detail : note.getGrnDetails()) {
                String productName = detail.getProduct().getProductName();
                int quantity = detail.getQuantity();

                totalImportsMap.put(productName, totalImportsMap.getOrDefault(productName, 0) + quantity);
            }
        }

        return totalImportsMap;
    }
    public Map<String, Integer> totalExportProducts() {
        List<Orders> allExports = orderRepository.findAll();
        Map<String, Integer> totalExportMap = new HashMap<>();

        for (Orders order : allExports) {
            for (OrderDetail detail : order.getOrderDetails()) {
                String productName = detail.getProduct().getProductName();
                int quantity = detail.getQuantity();

                totalExportMap.put(productName, totalExportMap.getOrDefault(productName, 0) + quantity);
            }
        }

        return totalExportMap;
    }
//    Ghép import và export vào cùng 1 bảng
    public Map<String, Pair<Integer, Integer>> totalProductQuantities() {
        List<GoodReceivedNote> allImports = grnRepository.findAll();
        List<Orders> allExports = orderRepository.findAll();
        Map<String, Pair<Integer, Integer>> importExportQuantity = new HashMap<>();

        for (GoodReceivedNote note : allImports) {
            for (GrnDetail grnDetail : note.getGrnDetails()) {
                String productName = grnDetail.getProduct().getProductName();
                int importQuantity = grnDetail.getQuantity();

                Pair<Integer, Integer> importExport = importExportQuantity.getOrDefault(productName, Pair.of(0, 0));
                importExportQuantity.put(productName, Pair.of(importExport.getFirst() + importQuantity, importExport.getSecond()));
            }
        }

        for (Orders order : allExports) {
            for (OrderDetail detail : order.getOrderDetails()) {
                String productName = detail.getProduct().getProductName();
                int quantity = detail.getQuantity();

                Pair<Integer, Integer> importExportPair = importExportQuantity.getOrDefault(productName, Pair.of(0, 0));
                importExportQuantity.put(productName, Pair.of(importExportPair.getFirst(), importExportPair.getSecond() + quantity));
            }
        }
        return importExportQuantity; //first is import & second is export
    }
//    Start date < report < end date (nếu muốn tính report của ngày hiện tại thì end date sẽ phải +1)
    public Map<String, Pair<Integer, Integer>> reportInTimeRange(LocalDate startDate, LocalDate endDate) {
        // Convert LocalDate to Date if not null
        Date start = startDate != null ? Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant()) : null;
        Date end = endDate != null ? Date.from(endDate.atStartOfDay(ZoneId.systemDefault()).toInstant()) : null;

        List<GoodReceivedNote> allImports = grnRepository.findAll();
        List<Orders> allOrders = orderRepository.findAll();
        Map<String, Pair<Integer, Integer>> importExportMap = new HashMap<>();

        for (GoodReceivedNote note : allImports) {
            // Check date range if start and end dates are provided
            if ((start == null || note.getImportDate().after(start)) && (end == null || note.getImportDate().before(end))) {
                for (GrnDetail detail : note.getGrnDetails()) {
                    String productName = detail.getProduct().getProductName();
                    int quantity = detail.getQuantity();

                    Pair<Integer, Integer> importExportPair = importExportMap.getOrDefault(productName, Pair.of(0, 0));
                    importExportMap.put(productName, Pair.of(importExportPair.getFirst() + quantity, importExportPair.getSecond()));
                }
            }
        }

        for (Orders order : allOrders) {
            // Check date range if start and end dates are provided
            if ((start == null || order.getExportDate().after(start)) && (end == null || order.getExportDate().before(end))) {
                for (OrderDetail detail : order.getOrderDetails()) {
                    String productName = detail.getProduct().getProductName();
                    int quantity = detail.getQuantity();

                    Pair<Integer, Integer> importExportPair = importExportMap.getOrDefault(productName, Pair.of(0, 0));
                    importExportMap.put(productName, Pair.of(importExportPair.getFirst(), importExportPair.getSecond() + quantity));
                }
            }
        }

        return importExportMap;
    }


//    public Map<String, Pair<Integer, Integer>> reportInTimeRange(LocalDate startDate, LocalDate endDate) {
//        Date start = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//        Date end = Date.from(endDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//
//        List<GoodReceivedNote> allImports = grnRepository.findAll();
//        List<Orders> allOrders = orderRepository.findAll();
//        Map<String, Pair<Integer, Integer>> importExportMap = new HashMap<>();
//
//        for (GoodReceivedNote note : allImports) {
//            if (note.getImportDate().after(start) && note.getImportDate().before(end)) {
//                for (GrnDetail detail : note.getGrnDetails()) {
//                    String productName = detail.getProduct().getProductName();
//                    int quantity = detail.getQuantity();
//
//                    Pair<Integer, Integer> importExportPair = importExportMap.getOrDefault(productName, Pair.of(0, 0));
//                    importExportMap.put(productName, Pair.of(importExportPair.getFirst() + quantity, importExportPair.getSecond()));
//                }
//            }
//        }
//
//        for (Orders order : allOrders) {
//            if (order.getExportDate().after(start) && order.getExportDate().before(end)) {
//                for (OrderDetail detail : order.getOrderDetails()) {
//                    String productName = detail.getProduct().getProductName();
//                    int quantity = detail.getQuantity();
//
//                    Pair<Integer, Integer> importExportPair = importExportMap.getOrDefault(productName, Pair.of(0, 0));
//                    importExportMap.put(productName, Pair.of(importExportPair.getFirst(), importExportPair.getSecond() + quantity));
//                }
//            }
//        }
//
//        return importExportMap;
//    }
}
