package com.raicod3.SDC.dtos.user;

import com.raicod3.SDC.models.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserResponseDto {

    private Integer id;
        private String fullName;
        private String email;
        private String phone;
        private String role;

    public UserResponseDto(UserModel user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.role = user.getRole();
    }

}
