package com.raicod3.SDC.models;

import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.enums.RentalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rentalId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String totalAmount;

    @Enumerated(EnumType.STRING)
    private RentalStatus status;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "renterId")
    private UserModel renter;

    @ManyToOne
    @JoinColumn(name = "itemId")
    private Item item;

    @Column(name = "owner_id")
    private int ownerId;

    public Rental(RentalRequestDto req, Item item, UserModel user) {

        this.startDate = req.getStartDate();
        this.endDate = req.getEndDate();
        this.totalAmount = req.getTotalAmount();
        this.status = RentalStatus.ACTIVE;
        this.createdAt = LocalDate.now();
        this.renter = user;
        this.item = item;
        this.ownerId = item.getUser().getId();
    }
}
