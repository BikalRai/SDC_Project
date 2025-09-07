package com.raicod3.SDC.controllers;

import com.raicod3.SDC.models.Item;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/items")
public class ItemContoller {

    public ResponseEntity<Item> addItem(@RequestBody Item item) {
return null;
    }
}
