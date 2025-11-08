package com.raicod3.SDC.models;

import com.raicod3.SDC.dtos.kyc.KYCRequestDto;
import com.raicod3.SDC.enums.KYCStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
    private KYCStatus status;
    private LocalDate submittedDate;
    private LocalDateTime verifiedDate;



    public KYCModel (KYCRequestDto kycRequestDto) {
        this.user = kycRequestDto.getUser();
        this.fullName = kycRequestDto.getFullName();
        this.fatherName = kycRequestDto.getFatherName();
        this.birthDate = kycRequestDto.getBirthDate();
        this.gender = kycRequestDto.getGender();
        this.email = kycRequestDto.getEmail();
        this.phone = kycRequestDto.getPhone();
        this.province = kycRequestDto.getProvince();
        this.district = kycRequestDto.getDistrict();
        this.municipality = kycRequestDto.getMunicipality();
        this.wardNumber = kycRequestDto.getWardNumber();
        this.street = kycRequestDto.getStreet();
        this.citizenshipId = kycRequestDto.getCitizenshipId();
        this.issuedDistrict = kycRequestDto.getIssuedDistrict();
        this.issuedDate = kycRequestDto.getIssuedDate();
        this.citizenshipFrontImageUrl = kycRequestDto.getCitizenshipFrontImageUrl();
        this.citizenshipBackImageUrl = kycRequestDto.getCitizenshipBackImageUrl();
        this.status = KYCStatus.PENDING;
        this.submittedDate = LocalDate.now();
    }

}
