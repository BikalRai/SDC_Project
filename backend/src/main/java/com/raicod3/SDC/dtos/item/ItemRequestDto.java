package com.raicod3.SDC.dtos.item;



import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.models.UserModel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.util.List;

public class ItemRequestDto {
    private long id;

    @NotBlank(message = "Title is required")
    private String title;
    private String description;

    @NotNull(message = "Daily rate price is required")
    @Positive(message = "Daily rate must be geather than zero")
    private double dailyRate;

    @NotNull(message = "Weekly rate price is required")
    @Positive(message = "Weekly rate must be geather than zero")
    private double weeklyRate;

    @NotNull(message = "Monthly rate price is required")
    @Positive(message = "Monthly rate must be geather than zero")
    private double monthlyRate;
    private List<String> imageUrls;

    @NotBlank(message = "Location cannot be blanked")
    private String location;

    @NotNull(message = "Status is required")
    private ItemStatus status;

    @NotNull(message = "Condition is required")
    private ItemCondition condition;
    private LocalDate createdAt;
    private UserModel owner;

    @NotNull(message = "Category is required")
    private int categoryId;

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

    public UserModel getOwner() {
        return owner;
    }

    public void setOwner(UserModel owner) {
        this.owner = owner;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}
