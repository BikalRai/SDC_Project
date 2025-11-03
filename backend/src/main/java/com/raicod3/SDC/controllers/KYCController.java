package com.raicod3.SDC.controllers;

import com.raicod3.SDC.services.KYCService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/kyc")
public class KYCController {

    @Autowired
    private KYCService kycService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createKYC(@RequestBody Map<String, String> body) {
        try {

        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while updating KYC",HttpStatus.BAD_REQUEST, null, e);
        }
    }
}
