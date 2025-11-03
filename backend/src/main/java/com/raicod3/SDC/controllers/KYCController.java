package com.raicod3.SDC.controllers;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.kyc.KYCRequestDto;
import com.raicod3.SDC.dtos.kyc.KYCResponseDto;
import com.raicod3.SDC.services.KYCService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/kyc")
public class KYCController {

    @Autowired
    private KYCService kycService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createKYC(@RequestBody KYCRequestDto request, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
        KYCResponseDto kycResponse = kycService.createKYC(customUserDetails, request);
        return ResponseBuilder.buildResponse("Created KYC successfully", HttpStatus.CREATED, kycResponse);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while creating KYC",HttpStatus.BAD_REQUEST, null, e);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getKYC(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {

        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while creating KYC",HttpStatus.BAD_REQUEST, null, e);
        }
    }
}
