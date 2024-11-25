package com.lab.backend.service.Impl;

import com.lab.backend.dto.request.CategoryRequest;
import com.lab.backend.model.Category;
import com.lab.backend.repository.CategoryRepo;
import com.lab.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepo categoryRepo;

    @Override
    public List<Category> getAllCategories() {
        return List.of();
    }

    @Override
    public Category getCategoryById(int id) {
        return null;
    }

    @Override
    public Category createCategory(CategoryRequest category) {
        return null;
    }

    @Override
    public Category updateCategory(CategoryRequest category) {
        return null;
    }

    @Override
    public void deleteCategory(long id) {
        categoryRepo.deleteById(id);
    }
}
