package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.CategoryRepository;
import com.raicod3.SDC.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public ItemResponseDto createItem(ItemRequestDto itemRequestDto, CustomUserDetails userDetails) {
        UserModel user = userDetails.getUser();

        Category category = categoryRepository.findById(itemRequestDto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));

        Item item = new Item(itemRequestDto, category);
        item.setOwner(user);

        Item savedItem = itemRepository.save(item);

        return new ItemResponseDto(savedItem);
    }

    public List<ItemResponseDto> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map(item -> new ItemResponseDto(item)).collect(Collectors.toList());
    }

    public ItemResponseDto getItemById(long id) {
        return new ItemResponseDto(itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found")));
    }

    public ItemResponseDto updateItem(long id, ItemRequestDto itemRequestDto, Category category) {
        Item existingItem = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));

        Item updatedItem = new Item(itemRequestDto, category);
        itemRepository.save(updatedItem);
        return new ItemResponseDto(existingItem);
    }

    public String deleteItemById(long id) {
        Item existingItem = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));

        itemRepository.delete(existingItem);
        return "Item deleted";
    }
}
