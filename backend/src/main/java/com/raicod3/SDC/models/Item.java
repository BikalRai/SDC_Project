package com.raicod3.SDC.models;

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
    private String title;
    private String description;
    private double dailyRate;
    private double weeklyRate;
    private double monthlyRate;

    @ElementCollection
    @Column(name = "image_urls")
    private List<String> imageUrls;
    private String location;
    private ItemStatus status;
    private ItemCondition condition;
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private UserModel owner;

    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    private ItemCondition conditionType;

    @Enumerated(EnumType.STRING)
    private ItemStatus itemStatus;

    public Item() {
    }

    public Item(long id, String title, String description, double dailyRate, double weeklyRate, double monthlyRate, List<String> imageUrls, String location, ItemStatus status, ItemCondition condition, LocalDate createdAt, UserModel owner, Category category, ItemCondition conditionType, ItemStatus itemStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dailyRate = dailyRate;
        this.weeklyRate = weeklyRate;
        this.monthlyRate = monthlyRate;
        this.imageUrls = imageUrls;
        this.location = location;
        this.status = status;
        this.condition = condition;
        this.createdAt = createdAt;
        this.owner = owner;
        this.category = category;
        this.conditionType = conditionType;
        this.itemStatus = itemStatus;
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

    public ItemStatus getStatus() {
        return status;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    public ItemCondition getCondition() {
        return condition;
    }

    public void setCondition(ItemCondition condition) {
        this.condition = condition;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
}
