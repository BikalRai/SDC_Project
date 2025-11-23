package com.raicod3.SDC.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;
    private String description;

    @Column(nullable = false)
    private String rate;

    @ElementCollection(fetch = FetchType.LAZY) // or LAZY
    @CollectionTable(name = "item_images", joinColumns = @JoinColumn(name = "item_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    @Column(nullable = false)
    private String location;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private UserModel owner;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    private ItemCondition conditionType;

//    @Enumerated(EnumType.STRING)
    private String status;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rental> rentals;


    public Item(ItemRequestDto itemRequestDto, Category category) {
        this.title = itemRequestDto.getTitle();
        this.description = itemRequestDto.getDescription();
        this.rate = itemRequestDto.getRate();
        this.imageUrls = itemRequestDto.getImageUrls();
        this.location = itemRequestDto.getLocation();
        this.createdAt = LocalDate.now();
        this.category = category;
//        this.conditionType = itemRequestDto.getCondition();
        this.status = itemRequestDto.getStatus();
        this.rentals = new ArrayList<>();
    }

}
