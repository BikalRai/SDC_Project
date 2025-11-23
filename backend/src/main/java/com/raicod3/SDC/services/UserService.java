package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public  UserResponseDto getUser(CustomUserDetails user) {
        UserModel existingUser = userRepository.findById(user.getUser().getId()).orElseThrow(() -> new HttpNotFoundException("User not found"));

        return new UserResponseDto(existingUser);

    }
}
