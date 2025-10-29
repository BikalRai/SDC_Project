package com.raicod3.SDC.controllers;

import com.raicod3.SDC.constants.HttpStatusConstants;
import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.rental.BookingResponseDto;
import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.dtos.rental.RentalResponseDto;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.Booking;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.services.RentalService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getRentals() {
        try {
            List<BookingResponseDto> allRentals = rentalService.getAllRentals();
            return ResponseBuilder.buildResponse("Rentals", HttpStatus.OK, allRentals);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error occurred while fetching rentals", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object> >getUserRentals(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            List <BookingResponseDto> allRentals = rentalService.getRentalsByUser(userDetails);
            return ResponseBuilder.buildResponse("Rentals", HttpStatus.OK, allRentals);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error occurred while fetching rentals", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<Map<String, Object>> approveRental(@PathVariable("id") String id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            BookingResponseDto rental = rentalService.approveRental(id, userDetails);
            return ResponseBuilder.buildResponse("Rental approved", HttpStatus.OK, rental);
        }catch(Exception e){
            return ResponseBuilder.buildResponse("Error occurred while updating rental", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteRental(@PathVariable("id") String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            String message = rentalService.deleteRental(id);
            response.put("message", message);
            response.put("statusCode", HttpStatusConstants.OK);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("message", "Error while deleting booking/rental");
            response.put("statusCode", HttpStatusConstants.INTERNAL_SERVER_ERROR);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
