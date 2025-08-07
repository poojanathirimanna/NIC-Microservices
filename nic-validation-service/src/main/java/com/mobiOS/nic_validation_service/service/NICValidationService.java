package com.mobiOS.nic_validation_service.service;

import com.mobiOS.nic_validation_service.model.NICRecord;
import com.mobiOS.nic_validation_service.repository.NICRecordRepository;
import com.mobiOS.nic_validation_service.util.NICParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.*;

@Service
public class NICValidationService {

    @Autowired
    private NICRecordRepository repository;

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public Map<String, Object> processCSV(MultipartFile file, String username) {
        List<NICRecord> insertedRecords = new ArrayList<>();
        List<String> skippedNICs = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            String line;
            while ((line = reader.readLine()) != null) {
                String nic = line.trim();
                System.out.println("📥 Reading NIC: " + nic);

                try {
                    LocalDate dob = NICParser.extractDOB(nic);
                    int age = NICParser.calculateAge(dob);
                    String gender = NICParser.extractGender(nic);

                    NICRecord record = NICRecord.builder()
                            .nicNumber(nic)
                            .birthday(dob)
                            .age(age)
                            .gender(gender)
                            .fileName(file.getOriginalFilename())
                            .createdAt(LocalDate.now())
                            .username(username) // ✅ stores the user who uploaded
                            .build();




                    NICRecord saved = repository.save(record);
                    insertedRecords.add(saved);
                    System.out.println("✅ Saved NIC: " + nic);

                } catch (Exception e) {
                    skippedNICs.add(nic);
                    System.err.println("⚠️ Skipping NIC: " + nic + " - " + e.getMessage());
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("❌ Error processing file " + file.getOriginalFilename(), e);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("inserted", insertedRecords);
        result.put("skipped", skippedNICs);
        return result;
    }

    public List<NICRecord> getAllRecords() {
        return repository.findAll();
    }
}
