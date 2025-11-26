package com.raicod3.SDC.controllers;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.UserRepository;
import com.raicod3.SDC.services.UserService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getUser(@AuthenticationPrincipal CustomUserDetails user) {
        try {
            UserResponseDto userResponseDto = userService.getUser(user);
            return ResponseBuilder.buildResponse("User retrieved successfully", HttpStatus.OK, userResponseDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseBuilder.buildResponse("An error occurred while trying to retrieve user", HttpStatus.INTERNAL_SERVER_ERROR,null, e);
        }
    }
}
