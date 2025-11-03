package com.raicod3.SDC.controllers;

import com.raicod3.SDC.constants.HttpStatusConstants;
import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.services.ItemService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    public ResponseEntity<?> createItemHandler(@Valid @RequestBody ItemRequestDto itemRequestDto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Map<String, Object> response = new HashMap<>();
        try {
            ItemResponseDto createdItem = itemService.createItem(itemRequestDto, userDetails);
            response.put("message", "Item created successfully");
            response.put("statusCode", HttpStatusConstants.CREATED);
            response.put("data", createdItem);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("message", "Failed to create item");
            response.put("statusCode", HttpStatusConstants.INTERNAL_SERVER_ERROR);
            response.put("data", null);
            response.put("error", e.getLocalizedMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllItemsHandler() {
        try {
            List<ItemResponseDto> allItems = itemService.getAllItems();
            return ResponseBuilder.buildResponse("All items", HttpStatus.OK, allItems);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("No items found", HttpStatus.NOT_FOUND, null, e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getItemByIdHandler(@PathVariable("id") long id) {
        try {
            ItemResponseDto item = itemService.getItemById(id);
            return ResponseBuilder.buildResponse("Item", HttpStatus.OK, item);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("No item found", HttpStatus.NOT_FOUND, null, e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateItemHandler(@PathVariable("id") long id, @RequestBody ItemRequestDto itemRequestDto, @AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody Category category) {
        try {
            ItemResponseDto updatedItem = itemService.updateItem(id, itemRequestDto, category);
            return ResponseBuilder.buildResponse("Item updated successfully", HttpStatus.OK, updatedItem);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Item did was not updated", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteItemHandler(@PathVariable("id") long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            String message = itemService.deleteItemById(id);
            response.put("message", message);
            response.put("statusCode", HttpStatusConstants.OK);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("message", "Item not found");
            response.put("statusCode", HttpStatusConstants.INTERNAL_SERVER_ERROR);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
