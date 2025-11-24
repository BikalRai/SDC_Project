package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.CategoryRepository;
import com.raicod3.SDC.repositories.ItemRepository;
import com.raicod3.SDC.repositories.RentalRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RentalRepository rentalRepository;

    public ItemResponseDto createItem(ItemRequestDto itemRequestDto, CustomUserDetails userDetails) {
        UserModel user = userDetails.getUser();

        Category category = categoryRepository.findById(itemRequestDto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));

        Item item = new Item(itemRequestDto, category);
        item.setOwner(user);

        Item savedItem = itemRepository.save(item);

        return new ItemResponseDto(savedItem);
    }

    public List<ItemResponseDto> getAllItems(CustomUserDetails userDetails) {
        List<Item> items = itemRepository.findAllByOwner(userDetails.getUser());
        return items.stream().map(item -> new ItemResponseDto(item)).collect(Collectors.toList());
    }

    public ItemResponseDto getItemById(long id) {
        return new ItemResponseDto(itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found")));
    }

    public ItemResponseDto updateItem(long id, ItemRequestDto itemRequestDto, CustomUserDetails userDetails) {

        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));


        // Verify ownership
        if (existingItem.getOwner().getId() != userDetails.getUser().getId()) {
            throw new RuntimeException("You don't have permission to update this item");
        }

        // Get category if it's being updated
        Category category = categoryRepository.findById(itemRequestDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Update the existing item's fields
        existingItem.setTitle(itemRequestDto.getTitle());
        existingItem.setDescription(itemRequestDto.getDescription());
        existingItem.setRate(itemRequestDto.getRate());
        existingItem.setImageUrls(itemRequestDto.getImageUrls());
        existingItem.setLocation(itemRequestDto.getLocation());
        existingItem.setCategory(category);
        existingItem.setStatus(itemRequestDto.getStatus());
        // existingItem.setConditionType(itemRequestDto.getCondition());

        Item savedItem = itemRepository.save(existingItem);
        return new ItemResponseDto(savedItem);
    }


    @Transactional
    public String deleteItemById(long id, CustomUserDetails userDetails) {
        System.out.println("Attempting to delete Item with id: " + id);

        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        System.out.println("Deleting rentals linked to item");
        rentalRepository.deleteByItem(existingItem);

       itemRepository.delete(existingItem);

        System.out.println("Deletion completed");
        return "Item deleted";
    }
}
