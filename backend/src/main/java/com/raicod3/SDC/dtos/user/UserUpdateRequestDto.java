package com.raicod3.SDC.dtos.user;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserUpdateRequestDto {
    private String fullName;
    private String phone;
    private String location;
    private String image;
}
