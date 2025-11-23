package com.raicod3.SDC.dtos.item;

import com.raicod3.SDC.dtos.category.CategoryResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.models.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponseDto {
    private long id;
    private String title;
    private String description;
    private String rate;
    private List<String> imageUrls;
    private String location;
    private String status;
    private ItemCondition condition;
    private LocalDate createdAt;
    private UserResponseDto owner;
    private CategoryResponseDto category;

    public ItemResponseDto(Item item) {
        this.id = item.getId();
        this.title = item.getTitle();;
        this.description = item.getDescription();;
        this.rate = item.getRate();
        this.imageUrls = item.getImageUrls();;
        this.location = item.getLocation();;
        this.status = item.getStatus();;
        this.condition = item.getConditionType();;
        this.createdAt = item.getCreatedAt();;
        this.owner = new UserResponseDto(item.getOwner());
        this.category = new CategoryResponseDto(item.getCategory());;
    }
}
