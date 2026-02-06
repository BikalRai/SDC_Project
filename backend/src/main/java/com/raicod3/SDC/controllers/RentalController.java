package com.raicod3.SDC.controllers;


import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.dtos.rental.CancelRentDto;
import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.dtos.rental.RentalResponseDto;
import com.raicod3.SDC.exceptions.HttpForbiddenException;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.exceptions.HttpUnprocessableException;
import com.raicod3.SDC.services.RentalService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rental")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @PostMapping("/rent")
    public ResponseEntity<Map<String, Object>> createRentController(@RequestBody RentalRequestDto rentalRequestDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            RentalResponseDto rentalResponseDto = rentalService.createRentalService(rentalRequestDto, customUserDetails);
            return ResponseBuilder.buildResponse("Created rental", HttpStatus.CREATED, rentalResponseDto);

        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse("Item not found: cannot create rent.", HttpStatus.NOT_FOUND, null);
        } catch (HttpUnprocessableException e) {
            return  ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY, null);
        }
        catch (Exception e) {
            return ResponseBuilder.buildResponse("Error creating rent.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @PostMapping("/payment-success/{rentalId}")
    public ResponseEntity<Map<String, Object>> confirmPaymentController(@PathVariable int rentalId) {
        try {
            RentalResponseDto response = rentalService.confirmPaymentAndActivateRental(rentalId);
            return ResponseBuilder.buildResponse("Payment successful. Item is now Rented.", HttpStatus.OK, response);
        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error processing payment.", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/rents/owner")
    public ResponseEntity<Map<String, Object>> getOwnerRentalsController(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {

            List<RentalResponseDto> rentalResponseDto = rentalService.getOwnerRentals(customUserDetails);

            if(rentalResponseDto.isEmpty()) {
                return ResponseBuilder.buildResponse("No items being rented at the moment.", HttpStatus.NOT_FOUND, new ArrayList<>());
            }

            return ResponseBuilder.buildResponse("Rental list", HttpStatus.OK, rentalResponseDto);
        }catch (Exception e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/rents/renter")
    public ResponseEntity<Map<String, Object>> getRenterRentalsController(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            List<RentalResponseDto> rentalResponseDto = rentalService.getRenterRentals(customUserDetails);

            if(rentalResponseDto.isEmpty()) {
                return ResponseBuilder.buildResponse("No items being rented.", HttpStatus.NOT_FOUND, new ArrayList<>());
            }

            return ResponseBuilder.buildResponse("Rental list", HttpStatus.OK, rentalResponseDto);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/rent/{rentalId}")
    public ResponseEntity<Map<String, Object>> getRentalByIdController(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable int rentalId) {
        try {
            RentalResponseDto rentalResponseDto = rentalService.getRentalById(rentalId);
            return ResponseBuilder.buildResponse("Rental details", HttpStatus.OK, rentalResponseDto);
        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.NOT_FOUND,null);
        } catch(Exception e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @PatchMapping("/return/{token}")
    public ResponseEntity<Map<String, Object>> returnItemByQrController(
            @PathVariable String token,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            // We pass customUserDetails to ensure only the ITEM OWNER can scan this
            RentalResponseDto response = rentalService.completeRentalByQr(token, customUserDetails);
            return ResponseBuilder.buildResponse("Item returned successfully. Item is now Available.", HttpStatus.OK, response);
        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse("Invalid QR Code.", HttpStatus.NOT_FOUND, null);
        } catch (HttpForbiddenException e) {
            return ResponseBuilder.buildResponse("Only the item owner can confirm this return.", HttpStatus.FORBIDDEN, null);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @PatchMapping("/cancel/{rentalId}")
    public  ResponseEntity<Map<String, Object>> cancelRentalHandler(@PathVariable int rentalId) {
        try {
            RentalResponseDto res = rentalService.cancelRental(rentalId);
            return ResponseBuilder.buildResponse("Cancelled rent successfully.", HttpStatus.OK, res);
        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse("Invalid QR Code.", HttpStatus.NOT_FOUND, null);
        }catch (Exception e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }


    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> cancelRentalController(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody CancelRentDto cancelRentDto) {
        try {

            ItemResponseDto item = rentalService.cancelRent(customUserDetails, cancelRentDto);

            return ResponseBuilder.buildResponse("Cancelled rental: item details is provided", HttpStatus.OK, item);

        } catch (HttpForbiddenException e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.FORBIDDEN, null);
        } catch (HttpNotFoundException e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }
}
