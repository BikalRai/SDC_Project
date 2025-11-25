package com.raicod3.SDC.dtos.item;



import com.raicod3.SDC.enums.ItemCondition;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.models.UserModel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ItemRequestDto {
    private long id;

    @NotBlank(message = "Title is required")
    private String title;
    private String description;

    private String rate;

    private List<String> imageUrls;

    @NotBlank(message = "Location cannot be blanked")
    private String location;

    @NotNull(message = "Status is required")
    private String status;

//    private ItemCondition condition;
//    private LocalDate createdAt;
//    private UserModel owner;

    @NotNull(message = "Category is required")
    private int categoryId;

}
