package com.raicod3.SDC.dtos.kyc;

import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.KYCStatus;
import com.raicod3.SDC.models.KYCModel;
import com.raicod3.SDC.models.UserModel;
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

    private int kycId;

    private String firstName;

    private String lastName;

    private String fatherName;

    private LocalDate dob;

    private UserResponseDto user;

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
    private KYCStatus KYCStatus;
    private LocalDate submittedDate;
    private LocalDate verifiedDate;

    public KYCResponseDto(UserModel user, KYCModel kyc) {
        this.user = new UserResponseDto(user);
        this.kycId = kyc.getId();
        this.firstName = kyc.getFirstName();
        this.lastName = kyc.getLastName();
        this.fatherName = kyc.getFatherName();
        this.dob = kyc.getDob();
        this.gender = kyc.getGender();
        this.phone = kyc.getPhone();
        this.province = kyc.getProvince();
        this.district = kyc.getDistrict();
        this.municipality = kyc.getMunicipality();
        this.wardNumber = kyc.getWardNumber();
        this.street = kyc.getStreet();
        this.citizenshipNumber = kyc.getCitizenshipNumber();
        this.issuedDistrict = kyc.getIssuedDistrict();
        this.issuedDate = kyc.getIssuedDate();
        this.citizenshipFrontImageUrl = kyc.getCitizenshipFrontImageUrl();
        this.citizenshipBackImageUrl = kyc.getCitizenshipBackImageUrl();
        this.KYCStatus = kyc.getStatus();
        this.submittedDate = kyc.getSubmittedDate();
        this.verifiedDate = kyc.getVerifiedDate();
    }
}
