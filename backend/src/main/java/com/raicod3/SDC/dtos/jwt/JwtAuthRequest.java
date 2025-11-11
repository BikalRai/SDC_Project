package com.raicod3.SDC.dtos.jwt;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class JwtAuthRequest {

    private String email;
    private String password;

    public JwtAuthRequest() {
    }

    public JwtAuthRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
