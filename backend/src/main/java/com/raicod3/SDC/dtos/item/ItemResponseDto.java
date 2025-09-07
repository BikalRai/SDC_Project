package com.raicod3.SDC.dtos.item;

import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.models.Item;

import java.time.LocalDate;
import java.util.List;

public class ItemResponseDto {
    private long id;
    private String title;
    private String description;
    private double dailyRate;
    private double weeklyRate;
    private double monthlyRate;
    private List<String> imageUrls;
    private String location;
    private ItemStatus status;
    private ItemCondition condition;
    private LocalDate createdAt;
    private UserResponseDto owner;
    private Category categoryId;

    public ItemResponseDto(Item item) {
        this.id = item.getId();
        this.title = item.getTitle();;
        this.description = item.getDescription();;
        this.dailyRate = item.getDailyRate();;
        this.weeklyRate = item.getWeeklyRate();;
        this.monthlyRate = item.getMonthlyRate();;
        this.imageUrls = item.getImageUrls();;
        this.location = item.getLocation();;
        this.status = item.getItemStatus();;
        this.condition = item.getConditionType();;
        this.createdAt = item.getCreatedAt();;
        this.owner = new UserResponseDto(item.getOwner());
        this.categoryId = item.getCategory();;
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

    public UserResponseDto getOwner() {
        return owner;
    }

    public void setOwner(UserResponseDto owner) {
        this.owner = owner;
    }

    public Category getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }
}
