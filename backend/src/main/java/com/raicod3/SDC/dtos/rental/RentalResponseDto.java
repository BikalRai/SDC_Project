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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RentalResponseDto {

    private int rentalId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate returnDate;
    private double totalAmount;
    private double securityDeposit;

    private RentalStatus status;
    private LocalDate createdAt;

    private UserResponseDto user;


    private ItemResponseDto item;

    public RentalResponseDto(Rental rental, UserResponseDto user, ItemResponseDto item) {
        this.rentalId = rental.getRentalId();
        this.startDate = rental.getStartDate();
        this.endDate = rental.getEndDate();
        this.returnDate = rental.getReturnDate();
        this.totalAmount = rental.getTotalAmount();
        this.securityDeposit = rental.getSecurityDeposit();
        this.status = rental.getStatus();
        this.createdAt = rental.getCreatedAt();
        this.user = user;
        this.item = item;
    }
}
