package com.raicod3.SDC.models;

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
    @JoinColumn(name = "userId", nullable = false)
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "itemId", nullable = false)
    private Item item;
}
