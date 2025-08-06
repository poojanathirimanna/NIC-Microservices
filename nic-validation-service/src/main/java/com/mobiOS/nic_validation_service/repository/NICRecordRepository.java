package com.mobiOS.nic_validation_service.repository;

import com.mobiOS.nic_validation_service.model.NICRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NICRecordRepository extends JpaRepository<NICRecord, Long> {
    boolean existsByNicNumber(String nicNumber);

}

