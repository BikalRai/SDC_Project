package com.raicod3.SDC.controllers;

import com.raicod3.SDC.constants.HttpStatusConstants;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/kyc")
public class KYCController {

    @Autowired
    private KYCService kycService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createKYCHandler(@RequestBody KYCRequestDto request, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            KYCResponseDto kycResponse = kycService.createKYC(customUserDetails, request);
            return ResponseBuilder.buildResponse("Created KYC successfully", HttpStatus.CREATED, kycResponse);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while creating KYC", HttpStatus.BAD_REQUEST, null, e);
        }
    }

    @GetMapping("user")
    public ResponseEntity<Map<String, Object>> getKYCHandler(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            KYCResponseDto kyc = kycService.getKYC(customUserDetails);
            return ResponseBuilder.buildResponse("KYC retrieved", HttpStatus.OK, kyc);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while creating KYC", HttpStatus.BAD_REQUEST, null, e);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Map<String, Object>> getKYCByIdHandler(@PathVariable("id") int id) {
        try {
            KYCResponseDto kyc = kycService.getKYCById(id);
            return ResponseBuilder.buildResponse("KYC retrieved", HttpStatus.OK, kyc);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while creating KYC", HttpStatus.BAD_REQUEST, null, e);
        }
    }

    @GetMapping("/kycs")
    public ResponseEntity<Map<String, Object>> getKYCsHandler(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            List<KYCResponseDto> kycs = kycService.getAllKYCs();

            if (kycs.isEmpty()) {
                return ResponseBuilder.buildResponse("There are no KYCs", HttpStatus.OK, kycs);
            }

            return ResponseBuilder.buildResponse("List of KYCs retrieved", HttpStatus.OK, kycs);

        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while fetching KYCs", HttpStatus.BAD_REQUEST, null, e);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Map<String, Object>> updateKYCHandler(@PathVariable("id") int id, KYCRequestDto requestDto) {
        try {
            KYCResponseDto updatedKYC = kycService.updateKYC(id, requestDto);

            if(updatedKYC == null) {
                return ResponseBuilder.buildResponse("KYC could not be updated", HttpStatus.BAD_REQUEST, null);
            }

            return ResponseBuilder.buildResponse("KYC updated successfully", HttpStatus.OK
            , updatedKYC);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while updating KYC", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteKYCHandler(@PathVariable("id") int id) {
        Map<String,Object> response = new HashMap<>();
        try {
            String message = kycService.deleteKYC(id);
            response.put("message", message);
            response.put("statusCode", HttpStatusConstants.OK);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("message", "Error while deleting KYC");
            response.put("statusCode", HttpStatusConstants.INTERNAL_SERVER_ERROR);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
