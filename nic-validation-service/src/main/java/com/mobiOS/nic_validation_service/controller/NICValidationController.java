package com.mobiOS.nic_validation_service.controller;

import com.mobiOS.nic_validation_service.model.NICRecord;
import com.mobiOS.nic_validation_service.service.NICValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/nic")
@CrossOrigin(origins = "*")
public class NICValidationController {

    @Autowired
    private NICValidationService nicService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        Map<String, Object> response = new LinkedHashMap<>();

        if (files.length != 4) {
            response.put("status", "error");
            response.put("message", "Exactly 4 CSV files must be uploaded.");
            return ResponseEntity.badRequest().body(response);
        }

        List<NICRecord> allInsertedRecords = new ArrayList<>();
        List<String> allSkippedNICs = new ArrayList<>();
        int fileErrors = 0;

        for (MultipartFile file : files) {
            try {
                Map<String, Object> result = nicService.processCSV(file);
                allInsertedRecords.addAll((List<NICRecord>) result.get("inserted"));
                allSkippedNICs.addAll((List<String>) result.get("skipped"));
            } catch (Exception e) {
                fileErrors++;
                System.err.println("❌ Failed to process file: " + file.getOriginalFilename());
            }
        }

        response.put("status", "success");
        response.put("message", "✅ CSV files processed.");
        response.put("filesProcessed", files.length);
        response.put("fileErrors", fileErrors);
        response.put("inserted", allInsertedRecords.size());
        response.put("skipped", allSkippedNICs.size());
        response.put("skippedNICs", allSkippedNICs);
        response.put("records", allInsertedRecords);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<NICRecord>> getAll() {
        return ResponseEntity.ok(nicService.getAllRecords());
    }
}
