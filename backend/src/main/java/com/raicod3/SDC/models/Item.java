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
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;
    private String description;

    @Column(nullable = false)
    private double dailyRate;

    @Column(nullable = false)
    private double weeklyRate;

    @Column(nullable = false)
    private double monthlyRate;

    @ElementCollection(fetch = FetchType.EAGER) // or LAZY
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

    @Enumerated(EnumType.STRING)
    private ItemStatus itemStatus;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Rental> rentals;


    public Item(ItemRequestDto itemRequestDto, Category category) {
        this.title = itemRequestDto.getTitle();
        this.description = itemRequestDto.getDescription();
        this.dailyRate = itemRequestDto.getDailyRate();
        this.weeklyRate = itemRequestDto.getWeeklyRate();
        this.monthlyRate = itemRequestDto.getMonthlyRate();
        this.imageUrls = itemRequestDto.getImageUrls();
        this.location = itemRequestDto.getLocation();
        this.createdAt = LocalDate.now();
        this.category = category;
        this.conditionType = itemRequestDto.getCondition();
        this.itemStatus = itemRequestDto.getStatus();
        this.rentals = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dailyRate=" + dailyRate +
                ", weeklyRate=" + weeklyRate +
                ", monthlyRate=" + monthlyRate +
                ", imageUrls=" + imageUrls +
                ", location='" + location + '\'' +
                ", createdAt=" + createdAt +
                ", owner=" + owner +
                ", category=" + category +
                ", conditionType=" + conditionType +
                ", itemStatus=" + itemStatus +
                '}';
    }
}
