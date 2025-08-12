package com.mobiOS.nic_validation_service.repository;

import com.mobiOS.nic_validation_service.model.NICRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NICRecordRepository extends JpaRepository<NICRecord, Long> {
    boolean existsByNicNumber(String nicNumber);
    // Get total records by username
    long countByUsername(String username);

    // Get male/female count by username and gender
    long countByUsernameAndGender(String username, String gender);

    //  for past records page:
    List<NICRecord> findByUsername(String username);


}

