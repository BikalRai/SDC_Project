package com.raicod3.SDC.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import jakarta.persistence.*;


import java.time.LocalDate;
import java.util.List;

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

    @ElementCollection
    @Column(name = "image_urls")
    private List<String> imageUrls;

    @Column(nullable = false)
    private String location;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference
    private UserModel owner;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    private ItemCondition conditionType;

    @Enumerated(EnumType.STRING)
    private ItemStatus itemStatus;

    public Item() {
    }

    public Item(long id, String title, String description, double dailyRate, double weeklyRate, double monthlyRate, List<String> imageUrls, String location, LocalDate createdAt, UserModel owner, Category category, ItemCondition conditionType, ItemStatus itemStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dailyRate = dailyRate;
        this.weeklyRate = weeklyRate;
        this.monthlyRate = monthlyRate;
        this.imageUrls = imageUrls;
        this.location = location;
        this.createdAt = createdAt;
        this.owner = owner;
        this.category = category;
        this.conditionType = conditionType;
        this.itemStatus = itemStatus;
    }

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
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getDailyRate() {
        return dailyRate;
    }

    public void setDailyRate(double dailyRate) {
        this.dailyRate = dailyRate;
    }

    public double getWeeklyRate() {
        return weeklyRate;
    }

    public void setWeeklyRate(double weeklyRate) {
        this.weeklyRate = weeklyRate;
    }

    public double getMonthlyRate() {
        return monthlyRate;
    }

    public void setMonthlyRate(double monthlyRate) {
        this.monthlyRate = monthlyRate;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public UserModel getOwner() {
        return owner;
    }

    public void setOwner(UserModel owner) {
        this.owner = owner;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public ItemCondition getConditionType() {
        return conditionType;
    }

    public void setConditionType(ItemCondition conditionType) {
        this.conditionType = conditionType;
    }

    public ItemStatus getItemStatus() {
        return itemStatus;
    }

    public void setItemStatus(ItemStatus itemStatus) {
        this.itemStatus = itemStatus;
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
