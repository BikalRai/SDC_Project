package com.raicod3.SDC.config;

import com.raicod3.SDC.custom.CustomOAuth2User;
import com.raicod3.SDC.custom.CustomUserDetailsService;
import com.raicod3.SDC.jwt.JwtAuthFilter;
import com.raicod3.SDC.jwt.JwtUtils;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.services.CustomOAuth2Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {


    private CustomUserDetailsService customUserDetailsService;

    private PasswordEncoder passwordEncoder;

    private JwtAuthFilter jwtAuthFilter;

    private CustomOAuth2Service customOAuth2UserService;

    private JwtUtils jwtUtils;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService, JwtAuthFilter jwtAuthFilter, CustomOAuth2Service customOAuth2UserService, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtAuthFilter = jwtAuthFilter;
        this.customOAuth2UserService = customOAuth2UserService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Bean
    @Order(1)
    public SecurityFilterChain oauth2FilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/oauth2/**", "/login/oauth2/code/**")
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests.anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2Login(oauth -> oauth
                        .authorizationEndpoint(auth -> auth
                                .baseUri("/oauth2/authorization") // backend route to start OAuth
                        )
                        .redirectionEndpoint(redir -> redir
                                .baseUri("/login/oauth2/code/*") // callback from Google
                        )
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService) // your service
                        )
                        .successHandler((request, response, authentication) -> {
                            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();


                            UserDetails user = oAuth2User.getUser();
                            String token = jwtUtils.generateToken(user);


                            // Redirect to frontend with JWT token
                            String redirectUrl = "http://localhost:5173/oauth2/redirect?token=" + token;
                            response.sendRedirect(redirectUrl);
                        })
                        .failureHandler((request, response, exception) -> {
                            log.error("OAuth2 login failed: {}", exception.getMessage());
                            exception.printStackTrace();
                            response.sendRedirect("http://localhost:5173/login?error=true");
                        })
                );

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtUtils jwtUtils) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cor -> {}) // uses the config that is in the application level
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(("/api/user/**")).permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .requestMatchers("/login/oauth2/code/**").permitAll()
                        .requestMatchers("/error").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/item/**").permitAll()
                        .requestMatchers( "/api/item/**").hasRole("USER")
                        .requestMatchers("/api/category/**").permitAll()
                        .requestMatchers(("/api/rental/**")).hasAnyRole("ADMIN", "USER")
                        .requestMatchers(("/api/kyc/**")).hasAnyRole("ADMIN", "USER")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                ;
        return http.build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
