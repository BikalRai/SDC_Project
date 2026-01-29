package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomOAuth2User;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
public class CustomOAuth2Service extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        if (email == null || email.isEmpty()) {
            log.error("Email not provided by OAuth2 provider");
            throw new OAuth2AuthenticationException("Email not provided by OAuth2 provider");
        }

        // Check if user exists, otherwise create one
        UserModel user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    log.info("Creating new user for email: {}", email);

                    UserModel newUser = new UserModel();
                    newUser.setEmail(email);
                    newUser.setFullName(name != null ? name : "User"); // Fallback if name is null
                    newUser.setRole("USER"); // Single ROLE_ prefix
                    newUser.setProvider("GOOGLE"); // Track OAuth provider

                    // Set profile picture if available
                    if (picture != null) {
                        newUser.setImage(picture);
                    }

                    // OAuth users don't need a password, but we set a random one
                    // This prevents them from logging in via traditional login
                    newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));

                    // Set creation timestamp if you have this field
                     newUser.setCreatedAt(LocalDateTime.now());

                    // Mark email as verified (Google already verified it)
                    // newUser.setEmailVerified(true);

                    UserModel savedUser = userRepository.save(newUser);
                    log.info("New OAuth2 user created with ID: {}", savedUser.getId());

                    return savedUser;
                });

        // If user exists but logged in via traditional method before
        // Update their provider and profile picture
        if (user.getProvider() == null || !user.getProvider().equals("GOOGLE")) {
            log.info("Updating existing user {} to OAuth2 provider", user.getId());
            user.setProvider("GOOGLE");
            if (picture != null && (user.getImage() == null || user.getImage().isEmpty())) {
                user.setImage(picture);
            }
            userRepository.save(user);
        }

        log.info("OAuth2 user authenticated: {} (ID: {})", email, user.getId());
        return new CustomOAuth2User(oAuth2User, user);
    }

}
