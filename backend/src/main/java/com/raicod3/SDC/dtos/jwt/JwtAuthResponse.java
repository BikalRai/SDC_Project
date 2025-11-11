package com.raicod3.SDC.dtos.jwt;

import com.raicod3.SDC.dtos.user.UserResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthResponse {

    private String accessToken;

    private String refreshToken;

    private List<String> roles;

    private UserResponseDto user;

}
