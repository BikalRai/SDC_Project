package com.raicod3.SDC.dtos.rental;

import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.RentalStatus;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.models.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RentalResponseDto {

    private int rentalId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String totalAmount;

    private RentalStatus status;
    private LocalDate createdAt;

    private UserResponseDto renter;
    private ItemResponseDto item;
    private int ownerId;


    public RentalResponseDto(Rental rental) {
        this.rentalId = rental.getRentalId();
        this.startDate = rental.getStartDate();
        this.endDate = rental.getEndDate();
        this.totalAmount = rental.getTotalAmount();
        this.status = rental.getStatus();
        this.createdAt = rental.getCreatedAt();
        this.renter = new UserResponseDto(rental.getRenter());
        this.item = new ItemResponseDto(rental.getItem());
        this.ownerId = rental.getOwnerId();
    }
}
