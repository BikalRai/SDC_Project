package com.raicod3.SDC.controllers;

import com.raicod3.SDC.constants.HttpStatusConstants;
import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.kyc.KYCProcessStatusRequest;
import com.raicod3.SDC.dtos.kyc.KYCRequestDto;
import com.raicod3.SDC.dtos.kyc.KYCResponseDto;
import com.raicod3.SDC.enums.KYCStatus;
import com.raicod3.SDC.exceptions.HttpForbiddenException;
import com.raicod3.SDC.exceptions.HttpUnprocessableException;
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

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createKYCHandler(@RequestBody KYCRequestDto request, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            KYCResponseDto kycResponse = kycService.createKYC(customUserDetails, request);
            return ResponseBuilder.buildResponse("Created KYC successfully", HttpStatus.CREATED, kycResponse);
        } catch (HttpUnprocessableException e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY, e.getMessage());
        }catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while creating KYC", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getKYCHandler(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            KYCResponseDto kyc = kycService.getKYC(customUserDetails);
            return ResponseBuilder.buildResponse("KYC retrieved", HttpStatus.OK, kyc);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while retrieving KYC", HttpStatus.BAD_REQUEST, null, e);
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

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateKYCHandler(@PathVariable("id") int id,@RequestBody KYCRequestDto requestDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {
            KYCResponseDto updatedKYC = kycService.updateKYC(id, requestDto, customUserDetails);

            return ResponseBuilder.buildResponse("KYC updated successfully", HttpStatus.OK
            , updatedKYC);
        } catch (HttpUnprocessableException e ){
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY, e.getMessage());
        }
        catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while updating KYC", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }

    @PutMapping("/update/status/{id}")
    public ResponseEntity<Map<String, Object>> updateKycStatusController(@PathVariable int id, @RequestBody KYCProcessStatusRequest status, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        try {

            KYCResponseDto kycResponseDto = kycService.updateKYCStatus(id, status, customUserDetails);

            return ResponseBuilder.buildResponse("KYC status updated successfully", HttpStatus.OK, kycResponseDto);
        } catch (HttpForbiddenException e) {
            return ResponseBuilder.buildResponse(e.getMessage(), HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("Error while updating KYC", HttpStatus.INTERNAL_SERVER_ERROR, null, e);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteKYCHandler(@PathVariable("id") int id, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Map<String,Object> response = new HashMap<>();
        try {
            String message = kycService.deleteKYC(id, customUserDetails);
            response.put("message", message);
            response.put("statusCode", HttpStatusConstants.OK);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (HttpForbiddenException e) {
            response.put("message", e.getMessage());
            response.put("statusCode", HttpStatus.FORBIDDEN);
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }catch (Exception e) {
            response.put("message", "Error while deleting KYC");
            response.put("statusCode", HttpStatusConstants.INTERNAL_SERVER_ERROR);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
