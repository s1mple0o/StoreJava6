package com.store.service;

import java.util.List;

import com.store.entity.Authority;

public interface AuthorityService {

	List<Authority> findAll();

	Authority create(Authority auth);
	
	public void delete(Integer id);

	List<Authority> findAuthoritiesOfAdministrators();

	

}
