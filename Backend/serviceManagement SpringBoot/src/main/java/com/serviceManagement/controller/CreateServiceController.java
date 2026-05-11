package com.serviceManagement.controller;

import com.serviceManagement.dto.ServiceModelDTO;
import com.serviceManagement.models.ServiceModel;
import com.serviceManagement.service.CreateServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CreateServiceController {

    @Autowired
    CreateServiceService createServiceService;

    @PostMapping("/createService")
    public ServiceModelDTO createService(@RequestBody ServiceModel service){

        System.out.println(service);

        ServiceModelDTO s  = createServiceService.createService(service);

        return s;
    }
}
