package com.mobiOS.nic_validation_service.util;

import java.time.LocalDate;
import java.time.Period;

public class NICParser {

    public static LocalDate extractDOB(String nic) {
        if (nic == null) {
            throw new IllegalArgumentException("NIC is null");
        }

        nic = nic.trim().toUpperCase();

        int year;
        int dayOfYear;

        if (nic.matches("\\d{9}[VX]")) {
            // Old NIC format (e.g., 823456789V)
            year = 1900 + Integer.parseInt(nic.substring(0, 2));
            dayOfYear = Integer.parseInt(nic.substring(2, 5));
        } else if (nic.matches("\\d{12}")) {
            // New NIC format (e.g., 200012345678)
            year = Integer.parseInt(nic.substring(0, 4));
            dayOfYear = Integer.parseInt(nic.substring(4, 7));
        } else {
            throw new IllegalArgumentException("Invalid NIC format: " + nic);
        }

        // Basic year and day validations
        if (year < 1900 || year > LocalDate.now().getYear()) {
            throw new IllegalArgumentException("Invalid year extracted from NIC: " + year);
        }

        if (dayOfYear < 1 || dayOfYear > 866) {
            throw new IllegalArgumentException("Invalid day of year in NIC: " + dayOfYear);
        }

        if (dayOfYear > 500) {
            dayOfYear -= 500; // Adjust for female
        }

        return LocalDate.ofYearDay(year, dayOfYear);
    }

    public static String extractGender(String nic) {
        if (nic == null) return "Unknown";

        nic = nic.trim().toUpperCase();

        int dayOfYear;

        if (nic.matches("\\d{9}[VX]")) {
            dayOfYear = Integer.parseInt(nic.substring(2, 5));
        } else if (nic.matches("\\d{12}")) {
            dayOfYear = Integer.parseInt(nic.substring(4, 7));
        } else {
            return "Unknown";
        }

        return dayOfYear > 500 ? "Female" : "Male";
    }

    public static int calculateAge(LocalDate dob) {
        LocalDate now = LocalDate.now();
        if (dob.isAfter(now)) {
            return 0;
        }
        return Period.between(dob, now).getYears();
    }
}
