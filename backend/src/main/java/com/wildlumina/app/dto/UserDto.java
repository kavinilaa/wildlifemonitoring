package com.wildlumina.app.dto;

import java.util.Objects;

public class UserDto {

    private Long id;
    private String loginId;
    private String role;
    private String fullName;
    private String email;
    private String phone;
    private String forestZone;
    private String forestRange;
    private String stationName;
    private String organization;
    private String department;
    private String officeName;
    private String status;

    public UserDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return Objects.equals(id, userDto.id) && Objects.equals(loginId, userDto.loginId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, loginId);
    }
}
