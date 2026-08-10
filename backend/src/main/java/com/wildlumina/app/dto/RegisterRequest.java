package com.wildlumina.app.dto;

public class RegisterRequest {

    private String role;
    private String fullName;
    private String email;
    private String phone;
    private String password;
    private String forestZone;
    private String forestRange;
    private String stationName;
    private String organization;
    private String department;
    private String officeName;

    public RegisterRequest() {
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getForestZone() {
        return forestZone;
    }

    public void setForestZone(String forestZone) {
        this.forestZone = forestZone;
    }

    public String getForestRange() {
        return forestRange;
    }

    public void setForestRange(String forestRange) {
        this.forestRange = forestRange;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getOfficeName() {
        return officeName;
    }

    public void setOfficeName(String officeName) {
        this.officeName = officeName;
    }
}
