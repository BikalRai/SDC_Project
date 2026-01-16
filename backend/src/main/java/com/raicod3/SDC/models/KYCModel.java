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
    private String firstName;
    private String lastName;
    private String fatherName;
    private LocalDate dob;
    private String gender;
    private String phone;

    // address
    private String province;
    private String district;
    private String municipality;
    private int wardNumber;
    private String street;

    // citizenship
    private String citizenshipNumber;
    private String issuedDistrict;
    private LocalDate issuedDate;
    private String citizenshipFrontImageUrl;
    private String citizenshipBackImageUrl;

    // verification
    private KYCStatus status;
    private Boolean isVerified;
    private LocalDate submittedDate;
    private LocalDate verifiedDate;



    public KYCModel (KYCRequestDto kycRequestDto, UserModel user) {
        this.user = user;
        this.firstName = kycRequestDto.getFirstName();
        this.lastName = kycRequestDto.getLastName();
        this.fatherName = kycRequestDto.getFatherName();
        this.dob = kycRequestDto.getDob();
        this.gender = kycRequestDto.getGender();
        this.phone = kycRequestDto.getPhone();
        this.province = kycRequestDto.getProvince();
        this.district = kycRequestDto.getDistrict();
        this.municipality = kycRequestDto.getMunicipality();
        this.wardNumber = kycRequestDto.getWardNumber();
        this.street = kycRequestDto.getStreet();
        this.citizenshipNumber = kycRequestDto.getCitizenshipNumber();
        this.issuedDistrict = kycRequestDto.getIssuedDistrict();
        this.issuedDate = kycRequestDto.getIssuedDate();
        this.citizenshipFrontImageUrl = kycRequestDto.getCitizenshipFrontImageUrl();
        this.citizenshipBackImageUrl = kycRequestDto.getCitizenshipBackImageUrl();
        this.status = KYCStatus.PENDING;
        this.isVerified = false;
        this.submittedDate = LocalDate.now();
    }

}
