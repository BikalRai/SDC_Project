package com.raicod3.SDC.controllers;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.kyc.KycVerifyRequestDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.dtos.user.UserUpdateRequestDto;
import com.raicod3.SDC.exceptions.HttpBadRequestException;
import com.raicod3.SDC.exceptions.HttpForbiddenException;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.UserRepository;
import com.raicod3.SDC.services.UserService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getUser(@AuthenticationPrincipal CustomUserDetails user) {
        try {
            UserResponseDto userResponseDto = userService.getUser(user);
            return ResponseBuilder.buildResponse("User retrieved successfully", HttpStatus.OK, userResponseDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseBuilder.buildResponse("An error occurred while trying to retrieve user", HttpStatus.INTERNAL_SERVER_ERROR,null, e);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String,Object>> updateUser(@AuthenticationPrincipal CustomUserDetails user, @RequestBody UserUpdateRequestDto dto) {
        try {
            UserResponseDto res = userService.updateUser(user, dto);

            return ResponseBuilder.buildResponse("User updated successfully.", HttpStatus.OK, res);
        }
        catch(HttpNotFoundException e) {
            return ResponseBuilder.buildResponse("User not found.", HttpStatus.NOT_FOUND, null, e);
        } catch (HttpForbiddenException e) {
            return ResponseBuilder.buildResponse("Access denied.", HttpStatus.FORBIDDEN, null, e);
        }
        catch(Exception e) {
            return ResponseBuilder.buildResponse("An error occurred while trying to update user.", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    @PatchMapping("/verify/{userId}")
    public ResponseEntity<Map<String, Object>> verifyKyc(@PathVariable int userId, @RequestBody KycVerifyRequestDto dto) {
        try {
            UserResponseDto res = userService.setIsUserVerified(userId, dto);
            return ResponseBuilder.buildResponse("Kyc verified.", HttpStatus.OK, res);
        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse("User/kyc not found.", HttpStatus.NOT_FOUND, null, e);
        }catch(Exception e) {
            return ResponseBuilder.buildResponse("An error occurred while trying to verify kyc.", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable int userId) {
        try {
            String res = userService.deleteUser(userId);
            return ResponseBuilder.buildResponse(res, HttpStatus.OK, res);
        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse("User not found.", HttpStatus.NOT_FOUND, e);
        }catch(Exception e) {
            return ResponseBuilder.buildResponse("An error occurred while trying to delete user.", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }
}
