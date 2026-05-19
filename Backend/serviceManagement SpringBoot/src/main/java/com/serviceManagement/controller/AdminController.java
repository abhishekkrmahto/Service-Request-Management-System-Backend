package com.serviceManagement.controller;

import com.serviceManagement.models.AdminSigninModel;
import com.serviceManagement.models.ServiceModel;
import com.serviceManagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class AdminController {
    @Autowired
    AdminService adminService;


    @PostMapping("/signinAdmin")
    public Object signInAdmin(@RequestBody AdminSigninModel adminSigninModel){
        Map<String,Object> response = (Map<String, Object>) adminService.signin(adminSigninModel);
        return response;
    }

    @GetMapping("/getAllServices")
    public List<ServiceModel> getAllServices() {
        List<ServiceModel> list = adminService.getAllServices();
        return list;
    }
}
