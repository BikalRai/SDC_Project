package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetailsService;
import com.raicod3.SDC.dtos.jwt.AuthRegistrationRequest;
import com.raicod3.SDC.dtos.jwt.JwtAuthRequest;
import com.raicod3.SDC.dtos.jwt.JwtAuthResponse;
import com.raicod3.SDC.jwt.JwtUtils;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;


    public JwtAuthResponse register(AuthRegistrationRequest request) {
        UserModel user = new UserModel();
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());

        String token = jwtUtils.generateToken(userDetails);

        return new JwtAuthResponse(token);
    }

    public JwtAuthResponse authenticate(JwtAuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmailOrPhone(), request.getPassword()));
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getEmailOrPhone());
        String token = jwtUtils.generateToken(userDetails);

        return new JwtAuthResponse(token);
    }
}
