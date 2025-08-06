package com.mobiOS.nic_validation_service.util;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class NICParser {

    public static LocalDate extractDOB(String nic) {
        if (nic == null || (nic.length() != 10 && nic.length() != 12)) {
            throw new IllegalArgumentException("Invalid NIC format");
        }

        int year = nic.length() == 10
                ? 1900 + Integer.parseInt(nic.substring(0, 2))
                : Integer.parseInt(nic.substring(0, 4));

        int dayOfYear = Integer.parseInt(nic.length() == 10
                ? nic.substring(2, 5)
                : nic.substring(4, 7));

        // Gender adjustment
        if (dayOfYear > 500) dayOfYear -= 500;

        return LocalDate.ofYearDay(year, dayOfYear);
    }

    public static String extractGender(String nic) {
        int dayOfYear = Integer.parseInt(nic.length() == 10
                ? nic.substring(2, 5)
                : nic.substring(4, 7));
        return (dayOfYear > 500) ? "Female" : "Male";
    }

    public static int calculateAge(LocalDate dob) {
        return Period.between(dob, LocalDate.now()).getYears();
    }
}
