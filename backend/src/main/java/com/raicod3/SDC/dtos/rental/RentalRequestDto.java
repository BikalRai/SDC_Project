package com.raicod3.SDC.dtos.rental;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RentalRequestDto {

    @NotNull(message = "Item id is required")
    private long itemId;

    @NotNull(message = "Proposed start date is required")
    private LocalDate startDate;

    @NotNull(message = "Proposed end date is required")
    private LocalDate endDate;

}
