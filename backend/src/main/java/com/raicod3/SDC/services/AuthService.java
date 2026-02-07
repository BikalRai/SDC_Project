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
import io.jsonwebtoken.ExpiredJwtException;
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

import java.time.LocalDateTime;
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

    @Autowired
    private EmailService emailService;


    public ResponseEntity<Map<String, Object>> register(AuthRegistrationRequest request) {

        try {

            List<UserModel> allUsers = userRepository.findAll();
//            System.out.println(request.getPassword() + ": PASSWORD RECEIVED");
            UserModel user = new UserModel();
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setCreatedAt(LocalDateTime.now());

            if(allUsers.isEmpty()) {
                user.setRole("ADMIN");
            } else{
                user.setRole("USER");

                try {
                    // If you have a name in your request, use it.
                    // Otherwise, this pulls the part before the @ in the email.
                    String nameForEmail = "New User";

                    emailService.sendWelcomeEmail(user.getEmail(), nameForEmail);
                } catch (Exception e) {
                    // We log the error but don't break the registration process
                    System.out.println("Email failed to send, but user was created: " + e.getMessage());
                }
            }

            UserModel savedUser = userRepository.save(user);

            UserResponseDto userResponseDto = new UserResponseDto(savedUser);

            return ResponseBuilder.buildResponse("Successfully registered user", HttpStatus.CREATED, userResponseDto);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("An error occurred while registering user", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    public JwtAuthResponse authenticate(JwtAuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getUsername());


        String accessToken = jwtUtils.generateToken(userDetails);
        String refreshToken = jwtUtils.generateRefreshToken(userDetails);

        UserModel user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->  new UsernameNotFoundException("User not found"));

        UserResponseDto userResponseDto = new UserResponseDto(user);

        return new JwtAuthResponse(accessToken, refreshToken, userResponseDto);
    }

    public JwtAuthResponse refreshToken(JwtRefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        try {
            if(jwtUtils.isTokenExpired(refreshToken)) {
                throw new BadCredentialsException("Invalid or expired refresh token");
            }
        } catch (ExpiredJwtException e) {
            throw new BadCredentialsException("Expired refresh token, please login again");
        }

        String username = jwtUtils.extractUsername(refreshToken);

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        String newAccessToken = jwtUtils.generateToken(userDetails);

        UserModel user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(() ->  new UsernameNotFoundException("User not found"));

        UserResponseDto userResponseDto = new UserResponseDto(user);

        return new JwtAuthResponse(newAccessToken, refreshToken, userResponseDto);
    }
}
