package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.dtos.user.UserUpdateRequestDto;
import com.raicod3.SDC.exceptions.HttpBadRequestException;
import com.raicod3.SDC.exceptions.HttpForbiddenException;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public  UserResponseDto getUser(CustomUserDetails user) {
        UserModel existingUser = userRepository.findById(user.getUser().getId()).orElseThrow(() -> new HttpNotFoundException("User not found"));
        return new UserResponseDto(existingUser);

    }

    public UserResponseDto updateUser(CustomUserDetails user, UserUpdateRequestDto dto) {
        UserModel existingUser = userRepository.findById(user.getUser().getId()).orElseThrow(() -> new HttpNotFoundException("User not found"));

        if(user.getUser().getId() != existingUser.getId()) {
            throw new HttpForbiddenException("You are not permitted to perform this action.");
        }

        existingUser.setFullName(dto.getFullName());
        existingUser.setPhone(dto.getPhone());
        existingUser.setLocation(dto.getLocation());
        existingUser.setUpdatedAt(LocalDateTime.now());
        existingUser.setImage(dto.getImage());
        userRepository.save(existingUser);
        return new UserResponseDto(existingUser);

    }
}
