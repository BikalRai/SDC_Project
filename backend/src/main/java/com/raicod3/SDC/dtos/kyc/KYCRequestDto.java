package com.raicod3.SDC.dtos.kyc;


import com.raicod3.SDC.enums.KYCStatus;
import com.raicod3.SDC.models.KYCModel;
import com.raicod3.SDC.models.UserModel;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KYCRequestDto {

    private UserModel user;

    // name and details
    @NotNull(message = "Field must not be empty")
    private String fullName;

    @NotNull(message = "Field must not be empty")
    private String fatherName;

    @NotNull(message = "Field must not be empty")
    private LocalDate birthDate;

    @NotNull(message = "Field must not be empty")
    private String gender;

    @NotNull(message = "Field must not be empty")
    private int email;

    @NotNull(message = "Field must not be empty")
    private String phone;

    // address
    @NotNull(message = "Field must not be empty")
    private String province;

    @NotNull(message = "Field must not be empty")
    private String district;

    @NotNull(message = "Field must not be empty")
    private String municipality;

    @NotNull(message = "Field must not be empty")
    private int wardNumber;

    @NotNull(message = "Field must not be empty")
    private String street;

    // citizenship
    @NotNull(message = "Field must not be empty")
    private String citizenshipId;

    @NotNull(message = "Field must not be empty")
    private String issuedDistrict;

    @NotNull(message = "Field must not be empty")
    private LocalDate issuedDate;

    @NotNull(message = "Field must not be empty")
    private String citizenshipFrontImageUrl;

    @NotNull(message = "Field must not be empty")
    private String citizenshipBackImageUrl;


    // verification
    private KYCStatus KYCStatus;
    private LocalDate submittedDate;
    private LocalDateTime verifiedDate;

    public KYCRequestDto(UserModel user, KYCModel kyc) {
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
        this.KYCStatus = kyc.getStatus();
        this.submittedDate = kyc.getSubmittedDate();
        this.verifiedDate = kyc.getVerifiedDate();
    }
}
