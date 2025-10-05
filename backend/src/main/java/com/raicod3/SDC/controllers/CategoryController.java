package com.raicod3.SDC.controllers;

import com.raicod3.SDC.dtos.category.CategoryResponseDto;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.services.CategoryService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Category category) {
        try{
            CategoryResponseDto createdCategory = categoryService.createCategory(category);
            return ResponseBuilder.buildResponse("Category created", HttpStatus.CREATED, createdCategory);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Failed to create category", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCategories() {
        try {
            List<CategoryResponseDto> allCategories = categoryService.getAllCategories();
            return ResponseBuilder.buildResponse("All categories", HttpStatus.OK, allCategories);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Failed to get all categories" , HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCategoryById(@PathVariable("id") int id) {
        try {
            CategoryResponseDto category = categoryService.getCategoryById(id);
            return ResponseBuilder.buildResponse("Category retrieved", HttpStatus.OK, category);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Failed to retrieve category", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateCategory(@PathVariable("id") int id, @RequestBody Category category) {
        try {
            CategoryResponseDto updatedCategory = categoryService.update(id, category);
            return ResponseBuilder.buildResponse("Category updated", HttpStatus.OK, updatedCategory);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Failed to update category", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable("id") int id) {
        Map<String, Object> response = new HashMap<>();

        try {
            String message = categoryService.deleteCategoryById(id);
            response.put("message", message);
            response.put("status", HttpStatus.OK);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", "Category deletion failed");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
