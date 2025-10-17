package com.raicod3.SDC.controllers;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.rental.BookingResponseDto;
import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.Booking;
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

    @PostMapping("/request")
    public ResponseEntity<Map<String, Object>> requestRental(@RequestBody RentalRequestDto request, @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            BookingResponseDto booking = rentalService.requestRental(request, userDetails);
            return ResponseBuilder.buildResponse("Booking requested", HttpStatus.CREATED, booking);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Booking not created", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

}
