package com.raicod3.SDC.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "rental_id")
    private Rental rental;

    private String transactionId;
    private Double amount;
    private String paymentMethod;
    private LocalDateTime paymentDate;
    private String status;
}
