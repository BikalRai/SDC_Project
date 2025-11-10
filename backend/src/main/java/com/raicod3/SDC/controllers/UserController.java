package com.raicod3.SDC.controllers;

import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public UserModel getUser(@PathVariable("id") int id) {
        return userRepository.findById(id).get();
    }
}
