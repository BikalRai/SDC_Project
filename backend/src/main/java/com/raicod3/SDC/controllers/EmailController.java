package com.raicod3.SDC.controllers;

import com.raicod3.SDC.dtos.EmailRequestDto;
import com.raicod3.SDC.services.EmailService;
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
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendEmail (@RequestBody  EmailRequestDto dto) {
        try {
            String to = dto.getTo();
            String subject = dto.getSubject();
            String username = dto.getUsername();
            emailService.sendHtmlTemplateEmail(to, subject, username);

            return ResponseBuilder.buildResponse("Successfully sent email.", HttpStatus.OK, "Successful");
        }catch (Exception e) {
            return ResponseBuilder.buildResponse("An error occurred while trying to send email", HttpStatus.INTERNAL_SERVER_ERROR, e);
        }
    }
}
