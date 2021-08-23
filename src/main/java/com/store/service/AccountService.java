package com.store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.store.entity.Account;

@Service
public interface AccountService {
	Account findById(String username);

	List<Account> getAdministrators();

	List<Account> findAll();
}
