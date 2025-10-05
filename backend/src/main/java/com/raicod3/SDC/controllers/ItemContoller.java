package com.raicod3.SDC.controllers;

import com.raicod3.SDC.constants.HttpStatusConstants;
import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.services.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemContoller {

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

    public ResponseEntity<?> getAllItemsHandler() {
        return null;
    }
}
