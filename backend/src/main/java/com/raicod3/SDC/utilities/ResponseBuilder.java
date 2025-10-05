package com.raicod3.SDC.utilities;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseBuilder {

    public static ResponseEntity<Map<String, Object>> buildResponse(String message, HttpStatus statusCode, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        response.put("statusCode", statusCode);
        response.put("data", data);
        return new ResponseEntity<>(response, statusCode);
    }

}
