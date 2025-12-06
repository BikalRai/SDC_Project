package com.raicod3.SDC.controllers;


import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.dtos.item.ItemRequestFilter;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.exceptions.HttpForbiddenException;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.services.ItemService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

   @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createItem(@RequestBody ItemRequestDto itemRequestDto, @AuthenticationPrincipal CustomUserDetails userDetails) {
       try {
        ItemResponseDto itemResponseDto = itemService.createItem(itemRequestDto, userDetails);
        return ResponseBuilder.buildResponse("Created item successfully.", HttpStatus.CREATED, itemResponseDto);
       } catch (Exception e) {
           return ResponseBuilder.buildResponse("An error occurred while trying to create item.", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
       }
   }

   @GetMapping("/items")
   public ResponseEntity<Map<String, Object>> getItems(@AuthenticationPrincipal CustomUserDetails userDetails, ItemRequestFilter filter) {
       try {
           List<ItemResponseDto> itemResponseDto = itemService.getItems(userDetails, filter);

           if (itemResponseDto.isEmpty()) {
               return ResponseBuilder.buildResponse("There are no items", HttpStatus.OK, new ArrayList<>());
           }

           return ResponseBuilder.buildResponse("Found items", HttpStatus.OK, itemResponseDto);
       } catch (HttpNotFoundException e) {
           return ResponseBuilder.buildResponse("No items found", HttpStatus.OK, new ArrayList<>());
       } catch (Exception e) {
           return ResponseBuilder.buildResponse("An error occurred while trying to get items.", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
       }
   }

   @GetMapping("/{id}")
   public ResponseEntity<Map<String, Object>> getItem(@PathVariable long id) {
       try {
           ItemResponseDto itemResponseDto = itemService.getItem(id);
           return ResponseBuilder.buildResponse("Found item successfully.", HttpStatus.OK, itemResponseDto);
       } catch (HttpNotFoundException e) {
           return ResponseBuilder.buildResponse("No item found", HttpStatus.OK, new ArrayList<>());
       } catch (Exception e) {
           return ResponseBuilder.buildResponse("An error occurred while trying to get item.", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
       }
   }

   @PutMapping("/update/{id}")
   public ResponseEntity<Map<String, Object>> updateItem(@PathVariable long id, @RequestBody ItemRequestDto itemRequestDto, @AuthenticationPrincipal CustomUserDetails userDetails) {
       try {
           ItemResponseDto itemResponseDto = itemService.updateItem(id, itemRequestDto, userDetails);
           return ResponseBuilder.buildResponse("Updated item successfully.", HttpStatus.OK, itemResponseDto);

       } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse("Item not found.", HttpStatus.NOT_FOUND, e);
       } catch (HttpForbiddenException e) {
           return ResponseBuilder.buildResponse("You are not allowed to update this item", HttpStatus.FORBIDDEN, e);
       } catch (Exception e) {
           return ResponseBuilder.buildResponse("An error occurred while trying to update item.", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
       }
   }

   @DeleteMapping("/delete/{itemId}")
   @Transactional
    public ResponseEntity<Map<String, Object>> deleteItem(@PathVariable Long itemId, @AuthenticationPrincipal CustomUserDetails userDetails) {
       try {
           String message = itemService.deleteItem(itemId, userDetails);
           return ResponseBuilder.buildResponse(message, HttpStatus.OK, null);
       } catch (HttpNotFoundException e) {
           return ResponseBuilder.buildResponse("Item not found.", HttpStatus.NOT_FOUND, e);
       } catch (HttpForbiddenException e) {
           return ResponseBuilder.buildResponse("You are not allowed to update this item", HttpStatus.FORBIDDEN, e);
       } catch (Exception e) {
           return ResponseBuilder.buildResponse("An error occurred while trying to create item.", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
       }
   }
}
