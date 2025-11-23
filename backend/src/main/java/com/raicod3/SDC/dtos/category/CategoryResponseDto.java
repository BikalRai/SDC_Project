package com.raicod3.SDC.dtos.category;

import com.raicod3.SDC.models.Category;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryResponseDto {
    private int id;
    private String name;
//    private String description;
//    private String iconUrl;
//    private boolean isActive;


    public CategoryResponseDto(Category category) {
        this.id = category.getId();
        this.name = category.getName();
//        this.description = category.getDescription();
//        this.iconUrl = category.getIconUrl();
//        this.isActive = category.isActive();
    }

}
