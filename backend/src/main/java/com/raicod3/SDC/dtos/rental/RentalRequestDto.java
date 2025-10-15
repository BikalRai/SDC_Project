package com.raicod3.SDC.dtos.rental;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class RentalRequestDto {

    @NotNull(message = "Item id is required")
    private long itemId;

    @NotNull(message = "Proposed start date is required")
    private LocalDate startDate;

    @NotNull(message = "Proposed end date is required")
    private LocalDate endDate;

    @NotNull(message = "Total price is required")
    private double totalAmount;

    @NotNull(message = "Security deposit is required")
    private double securityDeposit;
}
