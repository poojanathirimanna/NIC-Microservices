package com.mobiOS.nic_validation_service.model;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;

@Entity
@Table(name = "nic_records") // ✅ ensure this matches the actual table

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NICRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nicNumber;
    private LocalDate birthday;
    private int age;
    private String gender;
    private String fileName;
    private String username;

    @Builder.Default
    private LocalDate createdAt = LocalDate.now();

}
