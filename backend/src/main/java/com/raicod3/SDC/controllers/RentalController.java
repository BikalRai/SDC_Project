package com.raicod3.SDC.controllers;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.services.RentalService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/rental")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createRental(@RequestBody RentalRequestDto request, @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            Rental rental = rentalService.createRental(request, userDetails);
            return ResponseBuilder.buildResponse("Rental created", HttpStatus.CREATED, rental);
        }catch (IllegalArgumentException e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Rental not created", HttpStatus.BAD_REQUEST, null);
        }
    }

}
