package com.raicod3.SDC.dtos.jwt;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JwtRefreshRequest {

    private String refreshToken;
}
