package com.raicod3.SDC.controllers;


import com.raicod3.SDC.dtos.jwt.AuthRegistrationRequest;
import com.raicod3.SDC.dtos.jwt.JwtAuthRequest;
import com.raicod3.SDC.dtos.jwt.JwtAuthResponse;
import com.raicod3.SDC.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<JwtAuthResponse> register (@RequestBody AuthRegistrationRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login (@RequestBody JwtAuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
