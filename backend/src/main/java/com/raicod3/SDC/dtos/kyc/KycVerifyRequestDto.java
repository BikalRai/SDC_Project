package com.raicod3.SDC.dtos.kyc;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class KycVerifyRequestDto {
    private int kycId;
    private boolean verification;
}
