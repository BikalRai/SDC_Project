package com.raicod3.SDC.models;

import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.enums.Category;
import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String brand;
    private String description;

    @ElementCollection
    private List<String> specifications;

    @Enumerated(EnumType.STRING)
    private Category category;
    private String model;
    private double rating;
    private String dailyRate;
    private boolean isNegotiable;

    private int totalRented;

    @Enumerated(EnumType.STRING)
    private ItemStatus status;

    @Enumerated(EnumType.STRING)
    private ItemCondition condition;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ElementCollection
    private List<String> images;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Rental> rentals;

    @ManyToOne
    @JoinColumn(name = "ownerId")
    private UserModel user;

    public Item(ItemRequestDto requestDto, UserModel user) {
        this.name = requestDto.getName();
        this.brand = requestDto.getBrand();
        this.description = requestDto.getDescription();
        this.specifications = requestDto.getSpecifications();
        this.category = requestDto.getCategory();
        this.model = requestDto.getModel();
        this.dailyRate = requestDto.getDailyRate();
        this.isNegotiable = requestDto.isNegotiable();
        this.status = requestDto.getStatus();
        this.condition = requestDto.getCondition();
        this.images = requestDto.getImages();
        this.user = user;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.rating = 0;
        this.totalRented = 0;
        this.status = ItemStatus.AVAILABLE;
    }
}
