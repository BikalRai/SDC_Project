package com.raicod3.SDC.dtos.item;

import com.raicod3.SDC.dtos.review.ReviewResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.Category;
import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.models.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponseDto {

    private long id;
    private String name;
    private String brand;
    private String description;
    private String location;

    private List<String> specifications;

    private Category category;
    private String model;
    private double rating;
    private String dailyRate;
    private boolean isNegotiable;

    private int totalRented;

    private ItemStatus status;

    private ItemCondition condition;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<String> images;

    private int reviewCount;

    private UserResponseDto user;

    private List<ReviewResponseDto> reviews;

    public ItemResponseDto(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        this.brand = item.getBrand();
        this.description = item.getDescription();
        this.location = item.getLocation();
        this.specifications = item.getSpecifications();
        this.category = item.getCategory();
        this.model = item.getModel();
        this.rating = item.getRating();
        this.dailyRate = item.getDailyRate();
        this.isNegotiable = item.isNegotiable();
        this.totalRented = item.getTotalRented();
        this.status = item.getStatus();
        this.condition = item.getCondition();
        this.createdAt = item.getCreatedAt();
        this.updatedAt = item.getUpdatedAt();
        this.images = item.getImages();
        this.reviewCount = item.getReviews() != null ? item.getReviews().size() : 0;
        this.user = new UserResponseDto(item.getUser());
        this.reviews = item.getReviews() != null
                ? item.getReviews().stream().map(ReviewResponseDto::new).collect(Collectors.toList())
                : List.of();
    }
}
