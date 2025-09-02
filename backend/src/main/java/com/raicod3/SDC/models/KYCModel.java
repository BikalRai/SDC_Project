package com.raicod3.SDC.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "kyc")
public class KYCModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserModel user;

    // name and details
    private String fullName;
    private String fatherName;
    private LocalDate birthDate;
    private String gender;
    private int email;
    private String phone;

    // address
    private String province;
    private String district;
    private String municipality;
    private int wardNumber;
    private String street;

    // citizenship
    private String citizenshipId;
    private String issuedDistrict;
    private LocalDate issuedDate;
    private String citizenshipFrontImageUrl;
    private String citizenshipBackImageUrl;

    // verification
    private String KYCStatus;
    private LocalDate submittedDate;
    private LocalDateTime verifiedDate;

    public KYCModel() {
    }

    public KYCModel(int id, UserModel user, String fullName, String fatherName, LocalDate birthDate, String gender, int email, String phone, String province, String district, String municipality, int wardNumber, String street, String citizenshipId, String issuedDistrict, LocalDate issuedDate, String citizenshipFrontImageUrl, String citizenshipBackImageUrl, String KYCStatus, LocalDate submittedDate, LocalDateTime verifiedDate) {
        this.id = id;
        this.user = user;
        this.fullName = fullName;
        this.fatherName = fatherName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.province = province;
        this.district = district;
        this.municipality = municipality;
        this.wardNumber = wardNumber;
        this.street = street;
        this.citizenshipId = citizenshipId;
        this.issuedDistrict = issuedDistrict;
        this.issuedDate = issuedDate;
        this.citizenshipFrontImageUrl = citizenshipFrontImageUrl;
        this.citizenshipBackImageUrl = citizenshipBackImageUrl;
        this.KYCStatus = KYCStatus;
        this.submittedDate = submittedDate;
        this.verifiedDate = verifiedDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getEmail() {
        return email;
    }

    public void setEmail(int email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public int getWardNumber() {
        return wardNumber;
    }

    public void setWardNumber(int wardNumber) {
        this.wardNumber = wardNumber;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCitizenshipId() {
        return citizenshipId;
    }

    public void setCitizenshipId(String citizenshipId) {
        this.citizenshipId = citizenshipId;
    }

    public String getIssuedDistrict() {
        return issuedDistrict;
    }

    public void setIssuedDistrict(String issuedDistrict) {
        this.issuedDistrict = issuedDistrict;
    }

    public LocalDate getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(LocalDate issuedDate) {
        this.issuedDate = issuedDate;
    }

    public String getCitizenshipFrontImageUrl() {
        return citizenshipFrontImageUrl;
    }

    public void setCitizenshipFrontImageUrl(String citizenshipFrontImageUrl) {
        this.citizenshipFrontImageUrl = citizenshipFrontImageUrl;
    }

    public String getCitizenshipBackImageUrl() {
        return citizenshipBackImageUrl;
    }

    public void setCitizenshipBackImageUrl(String citizenshipBackImageUrl) {
        this.citizenshipBackImageUrl = citizenshipBackImageUrl;
    }

    public String getKYCStatus() {
        return KYCStatus;
    }

    public void setKYCStatus(String KYCStatus) {
        this.KYCStatus = KYCStatus;
    }

    public LocalDate getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(LocalDate submittedDate) {
        this.submittedDate = submittedDate;
    }

    public LocalDateTime getVerifiedDate() {
        return verifiedDate;
    }

    public void setVerifiedDate(LocalDateTime verifiedDate) {
        this.verifiedDate = verifiedDate;
    }

    @Override
    public String toString() {
        return "KYCModel{" +
                "id=" + id +
                ", user=" + user +
                ", fullName='" + fullName + '\'' +
                ", fatherName='" + fatherName + '\'' +
                ", birthDate=" + birthDate +
                ", gender='" + gender + '\'' +
                ", email=" + email +
                ", phone='" + phone + '\'' +
                ", province='" + province + '\'' +
                ", district='" + district + '\'' +
                ", municipality='" + municipality + '\'' +
                ", wardNumber=" + wardNumber +
                ", street='" + street + '\'' +
                ", citizenshipId='" + citizenshipId + '\'' +
                ", issuedDistrict='" + issuedDistrict + '\'' +
                ", issuedDate=" + issuedDate +
                ", citizenshipFrontImageUrl='" + citizenshipFrontImageUrl + '\'' +
                ", citizenshipBackImageUrl='" + citizenshipBackImageUrl + '\'' +
                ", KYCStatus='" + KYCStatus + '\'' +
                ", submittedDate=" + submittedDate +
                ", verifiedDate=" + verifiedDate +
                '}';
    }
}
