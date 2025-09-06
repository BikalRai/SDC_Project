package com.raicod3.SDC.dtos.jwt;

public class JwtAuthRequest {

    private String emailOrPhone;
    private String password;

    public JwtAuthRequest() {
    }

    public JwtAuthRequest(String emailOrPhone, String password) {
        this.emailOrPhone = emailOrPhone;
        this.password = password;
    }

    public String getEmailOrPhone() {
        return emailOrPhone;
    }

    public void setEmailOrPhone(String emailOrPhone) {
        this.emailOrPhone = emailOrPhone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
