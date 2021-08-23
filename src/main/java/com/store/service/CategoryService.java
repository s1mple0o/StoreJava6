package com.store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.store.entity.Category;

@Service
public interface CategoryService {

	List<Category> findAll();

}
