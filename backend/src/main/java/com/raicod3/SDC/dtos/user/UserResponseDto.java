package com.raicod3.SDC.dtos.user;

import com.raicod3.SDC.models.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
    private String image;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserResponseDto(UserModel user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.location = user.getLocation();
        this.role = user.getRole();
        this.image = user.getImage();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }

}
