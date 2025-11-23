package com.raicod3.SDC.models;

import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.enums.RentalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Rental {

    @Id
    private int rentalId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate returnDate;
    private double totalAmount;
    private double securityDeposit;

    @Enumerated(EnumType.STRING)
    private RentalStatus status;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "itemId")
    private Item item;

    public Rental(RentalRequestDto req, Item item, UserModel user) {

        this.startDate = req.getStartDate();
        this.endDate = req.getEndDate();
        this.totalAmount = req.getTotalAmount();
        this.securityDeposit = req.getSecurityDeposit();
        this.status = RentalStatus.ACTIVE;
        this.createdAt = LocalDate.now();
        this.user = user;
        this.item = item;
    }
}
