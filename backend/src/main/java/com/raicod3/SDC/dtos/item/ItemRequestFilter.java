package com.raicod3.SDC.dtos.item;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemRequestFilter {
    private String search;
    private String category;
    private String priceRange;
}
