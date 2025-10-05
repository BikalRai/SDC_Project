package com.raicod3.SDC.services;

import com.raicod3.SDC.dtos.category.CategoryResponseDto;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryResponseDto createCategory(Category category) {

        Category savedCategory = categoryRepository.save(category);

        return new CategoryResponseDto(savedCategory);
    }

    public List<CategoryResponseDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream().map(category -> new CategoryResponseDto(category)).collect(Collectors.toList());
    }

    public CategoryResponseDto getCategoryById(int id) {
        Optional<Category> existingCategory = categoryRepository.findById(id);

        return existingCategory.map(CategoryResponseDto::new).orElse(null);
    }

    public CategoryResponseDto update(int id, Category category) {

        Category existingCategory = categoryRepository.findById(id).get();
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        existingCategory.setActive(category.isActive());
        categoryRepository.save(existingCategory);

        return new CategoryResponseDto(existingCategory);
    }

    public String deleteCategoryById(int id) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        categoryRepository.delete(existingCategory.get());
        return "Category deleted";
    }
}
