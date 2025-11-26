package com.raicod3.SDC.models;

import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String bookingId;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    private LocalDate createdAt = LocalDate.now();

    @Column(nullable = false)
    private double totalAmount;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @Column(nullable = false)
    private double securityDeposit;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "itemId", nullable = false)
    private Item item;

    public Booking(RentalRequestDto req, UserModel user, Item item) {
        this.startDate = req.getStartDate();
        this.endDate = req.getEndDate();
        this.totalAmount = req.getTotalAmount();
        this.status = BookingStatus.PENDING;
        this.user = user;
        this.item = item;
        this.createdAt = LocalDate.now();
        this.securityDeposit = req.getSecurityDeposit();
    }
}
