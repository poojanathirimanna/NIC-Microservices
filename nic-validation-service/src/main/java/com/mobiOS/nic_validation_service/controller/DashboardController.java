package com.mobiOS.nic_validation_service.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.mobiOS.nic_validation_service.model.NICRecord;
import com.mobiOS.nic_validation_service.repository.NICRecordRepository;
import com.mobiOS.nic_validation_service.dto.UserDashboardSummaryDTO;
import com.mobiOS.nic_validation_service.security.JwtUtil;
import java.util.List;





@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private NICRecordRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/summary")
    public ResponseEntity<UserDashboardSummaryDTO> getDashboardSummary(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtUtil.getUsernameFromToken(token);

        long total = repository.countByUsername(username);
        long male = repository.countByUsernameAndGender(username, "Male");
        long female = repository.countByUsernameAndGender(username, "Female");

        return ResponseEntity.ok(new UserDashboardSummaryDTO(total, male, female));
    }

    @GetMapping("/records")
    public ResponseEntity<List<NICRecord>> getUserRecords(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtUtil.getUsernameFromToken(token);

        List<NICRecord> records = repository.findByUsername(username);
        return ResponseEntity.ok(records);
    }
}
