package com.raicod3.SDC.dtos.item;




import com.raicod3.SDC.enums.Category;
import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemRequestDto {

    @NotBlank(message = "Item name is required")
    private String name;

    @NotBlank(message = "Brand is required")
    private String brand;

    private String model;

    private String location;

    @NotBlank(message = "Description is required")
    private String description;

    private List<String> specifications;

    @NotBlank(message = "Category is required")
    private Category category;

    @NotNull(message = "Daily rate is required")
    private String dailyRate;

    private ItemStatus status;

    private boolean isNegotiable;

    @NotBlank(message = "Condition is required")
    private ItemCondition condition;

    private List<String> images;


}
