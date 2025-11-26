package com.raicod3.SDC.utilities;

import com.raicod3.SDC.models.Category;
import com.raicod3.SDC.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CategoryStartUpRunner implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        List<String> categories = List.of("scooter", "electronic", "book");

        for (String category : categories) {
            if(!categoryRepository.existsByName(category)) {
                categoryRepository.save(new Category(category));
            }
        }
    }
}
