package com.raicod3.SDC.controllers;

import com.raicod3.SDC.dtos.category.CategoryResponseDto;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponseDto> create(@RequestBody Category category) {
        try{
            CategoryResponseDto response = categoryService.createCategory(category);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new CategoryResponseDto(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
