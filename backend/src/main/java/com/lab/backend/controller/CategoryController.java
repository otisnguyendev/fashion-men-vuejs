package com.lab.backend.controller;

import com.lab.backend.dto.response.CategoryResponse;
import com.lab.backend.dto.response.ResponseData;
import com.lab.backend.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @Operation(summary = "", description = "")
    @DeleteMapping("/{id}")
    public ResponseData<CategoryResponse> delete(@PathVariable long id) {
        categoryService.deleteCategory(id);
        return null;
    }
}
