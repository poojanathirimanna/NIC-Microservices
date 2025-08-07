package com.mobiOS.nic_validation_service.dto;

public class UserDashboardSummaryDTO {

    private long totalRecords;
    private long maleCount;
    private long femaleCount;

    public UserDashboardSummaryDTO(long totalRecords, long maleCount, long femaleCount) {
        this.totalRecords = totalRecords;
        this.maleCount = maleCount;
        this.femaleCount = femaleCount;
    }

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(long totalRecords) {
        this.totalRecords = totalRecords;
    }

    public long getMaleCount() {
        return maleCount;
    }

    public void setMaleCount(long maleCount) {
        this.maleCount = maleCount;
    }

    public long getFemaleCount() {
        return femaleCount;
    }

    public void setFemaleCount(long femaleCount) {
        this.femaleCount = femaleCount;
    }
}
