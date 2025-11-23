package com.raicod3.SDC.dtos.jwt;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class JwtAuthRequest {

    private String username;
    private String password;

    public JwtAuthRequest() {
    }

    public JwtAuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
