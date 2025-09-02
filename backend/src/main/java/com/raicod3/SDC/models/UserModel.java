package com.raicod3.SDC.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fullName;
    private String email;
    private String phone;
    private String password;

    @OneToOne(mappedBy = "user")
    private KYCModel userKyc;
}
