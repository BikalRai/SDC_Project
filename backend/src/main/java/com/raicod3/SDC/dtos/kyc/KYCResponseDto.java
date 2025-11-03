package com.raicod3.SDC.dtos.kyc;

import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.models.KYCModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KYCResponseDto {

    private String fullName;

    private String fatherName;

    private LocalDate birthDate;

    private UserResponseDto user;

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

    public KYCResponseDto(UserResponseDto user, KYCModel kyc) {
        this.user = user;
        this.fullName = kyc.getFullName();
        this.fatherName = kyc.getFatherName();
        this.birthDate = kyc.getBirthDate();
        this.gender = kyc.getGender();
        this.email = kyc.getEmail();
        this.phone = kyc.getPhone();
        this.province = kyc.getProvince();
        this.district = kyc.getDistrict();
        this.municipality = kyc.getMunicipality();
        this.wardNumber = kyc.getWardNumber();
        this.street = kyc.getStreet();
        this.citizenshipId = kyc.getCitizenshipId();
        this.issuedDistrict = kyc.getIssuedDistrict();
        this.issuedDate = kyc.getIssuedDate();
        this.citizenshipFrontImageUrl = kyc.getCitizenshipFrontImageUrl();
        this.citizenshipBackImageUrl = kyc.getCitizenshipBackImageUrl();
        this.KYCStatus = kyc.getKYCStatus();
        this.submittedDate = kyc.getSubmittedDate();
        this.verifiedDate = kyc.getVerifiedDate();
    }
}
