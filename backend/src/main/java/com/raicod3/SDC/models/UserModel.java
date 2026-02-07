package com.raicod3.SDC.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fullName;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phone;
    private String password;
    private String role;
    private String location;
    private String image;
    private String provider;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isVerified = false;
    private Boolean profileUpdated = false;

    @OneToOne(mappedBy = "user")
    private KYCModel userKyc;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items;

    @OneToMany(mappedBy = "renter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rental> rentals;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Review> reviews;

}
