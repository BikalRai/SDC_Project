package com.raicod3.SDC.dtos.earning;

import com.raicod3.SDC.enums.EarningStatus;
import com.raicod3.SDC.models.Earning;
import com.raicod3.SDC.models.Rental;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EarningResponseDto {
    private int id;

    private Rental rent;

    private long fee;

    private EarningStatus status;

    private LocalDateTime createAt;

    public EarningResponseDto(Earning earning) {
        this.id = earning.getId();
        this.rent = earning.getRent();
        this.fee = earning.getFee();
        this.status = earning.getStatus();
        this.createAt = earning.getCreateAt();
    }
}
