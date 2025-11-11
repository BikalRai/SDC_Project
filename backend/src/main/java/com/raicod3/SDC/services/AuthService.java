package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetailsService;
import com.raicod3.SDC.dtos.jwt.AuthRegistrationRequest;
import com.raicod3.SDC.dtos.jwt.JwtAuthRequest;
import com.raicod3.SDC.dtos.jwt.JwtAuthResponse;
import com.raicod3.SDC.dtos.jwt.JwtRefreshRequest;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.jwt.JwtUtils;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.UserRepository;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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


    public ResponseEntity<Map<String, Object>> register(AuthRegistrationRequest request) {

        try {
//            System.out.println(request.getPassword() + ": PASSWORD RECEIVED");
            UserModel user = new UserModel();
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(request.getRole().toUpperCase());

            UserModel savedUser = userRepository.save(user);

            UserResponseDto userResponseDto = new UserResponseDto(savedUser);

            return ResponseBuilder.buildResponse("Successfully registered user", HttpStatus.CREATED, userResponseDto);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("An error occurred while registering user", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    public JwtAuthResponse authenticate(JwtAuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getEmail());

        UserModel user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserResponseDto userResponseDto = new UserResponseDto(user);

        String accessToken = jwtUtils.generateToken(userDetails);
        String refreshToken = jwtUtils.generateRefreshToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return new JwtAuthResponse(accessToken, refreshToken, roles, userResponseDto);
    }

    public JwtAuthResponse refreshToken(JwtRefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        if(jwtUtils.isTokenExpired(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        String username = jwtUtils.extractUsername(refreshToken);

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        UserModel user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserResponseDto userResponseDto = new UserResponseDto(user);

        String newAccessToken = jwtUtils.generateToken(userDetails);

        List<String> role = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return new JwtAuthResponse(newAccessToken, refreshToken, role, userResponseDto);
    }
}
