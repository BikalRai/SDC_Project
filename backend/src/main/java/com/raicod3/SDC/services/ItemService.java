package com.raicod3.SDC.services;


import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.dtos.item.ItemRequestFilter;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.enums.Category;
import com.raicod3.SDC.exceptions.HttpBadRequestException;
import com.raicod3.SDC.exceptions.HttpForbiddenException;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.ItemRepository;
import com.raicod3.SDC.repositories.RentalRepository;
import com.raicod3.SDC.repositories.ReviewRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public ItemResponseDto createItem(ItemRequestDto itemRequestDto, CustomUserDetails customUserDetails) {
        UserModel userModel = customUserDetails.getUser();

        Item item = new Item(itemRequestDto, userModel);

        itemRepository.save(item);

        return new ItemResponseDto(item);

    }

    public List<ItemResponseDto> getItems(CustomUserDetails customUserDetails, ItemRequestFilter filter) throws BadRequestException {

        String search = filter.getSearch();
        Category category = null;

        if (filter.getCategory() != null && !filter.getCategory().isEmpty()) {
            try {
                category = Category.valueOf(filter.getCategory().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid category: " + filter.getCategory());
            }
        }
        Integer minPrice = null;
        Integer maxPrice = null;

        String range = filter.getPriceRange();

        if (range != null && !range.isEmpty()) {

            if (range.contains("-")) {
                String[] parts = range.split("-");
                minPrice = Integer.parseInt(parts[0].trim());
                maxPrice = Integer.parseInt(parts[1].trim());
            }
            else if (range.endsWith("+")) {
                minPrice = Integer.parseInt(range.replace("+", "").trim());
                maxPrice = null; // No upper limit
            }
            else {
                // If only a number is passed, treat it as minPrice with no maxPrice
                minPrice = Integer.parseInt(range.trim());
                maxPrice = null;
            }
        }


        boolean hasAnyFilter =
                (search != null && !search.isEmpty()) ||
                        (category != null) ||
                        (range != null && !range.isEmpty());

        if (hasAnyFilter) {
            List<Item> filtered = itemRepository.filterItems(search, category, minPrice, maxPrice);
            return filtered.stream()
                    .map(ItemResponseDto::new)
                    .collect(Collectors.toList());
        }

        if(customUserDetails == null) {
           List<Item> allItems = itemRepository.findAll();
           return allItems.stream().map(ItemResponseDto::new).collect(Collectors.toList());
        }

        List<Item> items = itemRepository.findAllByUser(customUserDetails.getUser());
        return items.stream().map(ItemResponseDto::new).collect(Collectors.toList());
    }

    public ItemResponseDto getItem(@PathVariable long id ) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new HttpNotFoundException("Item not found"));

       return new ItemResponseDto(item);
    }


    public ItemResponseDto updateItem(long id, ItemRequestDto itemRequestDto, CustomUserDetails customUserDetails) {

        Item existingItem = itemRepository.findById(id).orElseThrow(() -> new HttpNotFoundException("Item not found"));

        if(existingItem.getUser().getId() != customUserDetails.getUser().getId()) {
            throw new HttpForbiddenException("You are not allowed to update this item");
        }

        existingItem.setName(itemRequestDto.getName());
        existingItem.setBrand(itemRequestDto.getBrand());
        existingItem.setModel(itemRequestDto.getModel());
        existingItem.setDescription(itemRequestDto.getDescription());
        existingItem.setSpecifications(itemRequestDto.getSpecifications());
        existingItem.setCategory(itemRequestDto.getCategory());
        existingItem.setDailyRate(itemRequestDto.getDailyRate());
        existingItem.setStatus(itemRequestDto.getStatus());
        existingItem.setNegotiable(itemRequestDto.isNegotiable());
        existingItem.setCondition(itemRequestDto.getCondition());
        existingItem.setImages(itemRequestDto.getImages());

       itemRepository.save(existingItem);

       return new ItemResponseDto(existingItem);

    }


    @Transactional
    public String deleteItem(long itemId, CustomUserDetails customUserDetails) {

        Item existingItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new HttpNotFoundException("Item not found"));

        if (existingItem.getUser().getId() != customUserDetails.getUser().getId()) {
            throw new HttpForbiddenException("You are not authorized to delete this item.");
        }

        // JPA cascade will automatically delete rentals and reviews
        itemRepository.delete(existingItem);

        return "Item successfully deleted";
    }
}
