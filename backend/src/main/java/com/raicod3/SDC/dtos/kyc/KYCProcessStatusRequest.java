package com.raicod3.SDC.dtos.kyc;

import com.raicod3.SDC.enums.KYCStatus;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class KYCProcessStatusRequest {
    private KYCStatus status;
}
