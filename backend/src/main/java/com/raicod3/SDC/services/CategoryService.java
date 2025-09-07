package com.raicod3.SDC.services;

import com.raicod3.SDC.dtos.category.CategoryResponseDto;
import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryResponseDto createCategory(Category category) {

        Category savedCategory = categoryRepository.save(category);

        return  new CategoryResponseDto(savedCategory);
    }
}
