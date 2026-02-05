package com.raicod3.SDC.controllers;

import com.raicod3.SDC.services.AdminService;
import com.raicod3.SDC.utilities.ResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getAdminDashboardStats() {
        try{
            Map<String, Object> stats = adminService.getAdminDashboardStatsService();

            return ResponseBuilder.buildResponse("Successfully retrieved dashboard stats.", HttpStatus.OK, stats);
        } catch (Exception e) {
            return ResponseBuilder.buildResponse("An error occurred while trying to get dashboard stats.", HttpStatus.INTERNAL_SERVER_ERROR,e);
        }

    }

}
