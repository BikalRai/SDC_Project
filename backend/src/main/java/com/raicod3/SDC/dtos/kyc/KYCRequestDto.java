package com.raicod3.SDC.dtos.kyc;


import com.raicod3.SDC.enums.KYCStatus;
import com.raicod3.SDC.models.KYCModel;
import com.raicod3.SDC.models.UserModel;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class KYCRequestDto {

    private UserModel user;

    // name and details
    @NotNull(message = "Field must not be empty")
    private String firstName;

    @NotNull(message = "Field must not be empty")
    private String lastName;

    @NotNull(message = "Field must not be empty")
    private String fatherName;

    @NotNull(message = "Field must not be empty")
    private LocalDate dob;

    @NotNull(message = "Field must not be empty")
    private String gender;

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
    private String citizenshipNumber;

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
    private LocalDate verifiedDate;

}
