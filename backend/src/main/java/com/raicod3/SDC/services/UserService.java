package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.kyc.KycVerifyRequestDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.dtos.user.UserUpdateRequestDto;
import com.raicod3.SDC.exceptions.HttpBadRequestException;
import com.raicod3.SDC.exceptions.HttpForbiddenException;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.KYCModel;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.KYCRepository;
import com.raicod3.SDC.repositories.RentalRepository;
import com.raicod3.SDC.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KYCRepository kycRepository;

    @Autowired
    private RentalRepository rentalRepository;

    public  UserResponseDto getUser(CustomUserDetails user) {
        UserModel existingUser = userRepository.findById(user.getUser().getId()).orElseThrow(() -> new HttpNotFoundException("User not found"));
        return new UserResponseDto(existingUser);

    }

    public UserResponseDto updateUser(CustomUserDetails user, UserUpdateRequestDto dto) {
        UserModel existingUser = userRepository.findById(user.getUser().getId()).orElseThrow(() -> new HttpNotFoundException("User not found"));

        if(user.getUser().getId() != existingUser.getId()) {
            throw new HttpForbiddenException("You are not permitted to perform this action.");
        }

        existingUser.setFullName(dto.getFullName());
        existingUser.setPhone(dto.getPhone());
        existingUser.setLocation(dto.getLocation());
        existingUser.setUpdatedAt(LocalDateTime.now());
        existingUser.setImage(dto.getImage());
        existingUser.setProfileUpdated(true);
        userRepository.save(existingUser);
        return new UserResponseDto(existingUser);

    }

    @Transactional
    public String deleteUser(int userId) {
        UserModel user = userRepository.findById(userId).orElseThrow();

        // Find rentals where this user is the renter
        List<Rental> rentals = rentalRepository.findByRenter(user);

        // Unlink the user from the rentals
        for (Rental rental : rentals) {
            rental.setRenter(null);
        }
        rentalRepository.saveAll(rentals);

        // Now it's safe to delete the user
        userRepository.delete(user);

        return "User deleted successfully.";
    }
}
