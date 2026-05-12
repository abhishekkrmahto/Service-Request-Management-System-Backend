package com.serviceManagement.controller;

import com.serviceManagement.models.ServiceManModel;
import com.serviceManagement.service.ServiceManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ServiceManController {

    @Autowired
    ServiceManService serviceManService;

    @PostMapping("/registerServiceMan")
    public Object registerServiceMan(@RequestBody ServiceManModel serviceManModel){
        Map<String,Object> response = (Map<String, Object>) serviceManService.registerServiceMan(serviceManModel);
        return response;
    }
}
