package com.lab.backend.service;

import com.lab.backend.dto.request.CategoryRequest;
import com.lab.backend.model.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    List<Category> getAllCategories();

    Category getCategoryById(int id);

    Category createCategory(CategoryRequest category);

    Category updateCategory(CategoryRequest category);

    void deleteCategory(long id);
}
