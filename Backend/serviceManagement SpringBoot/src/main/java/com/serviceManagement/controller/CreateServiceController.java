package com.serviceManagement.controller;

import com.serviceManagement.dto.ServiceModelDTO;
import com.serviceManagement.models.ServiceModel;
import com.serviceManagement.service.CreateServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class CreateServiceController {

    @Autowired
    CreateServiceService createServiceService;

    @PostMapping("/createService")
    public ServiceModelDTO createService(@RequestBody ServiceModel service){

        System.out.println(service);

        ServiceModelDTO s  = createServiceService.createService(service);

        return s;
    }


    @GetMapping("/getServices")
    public List<ServiceModelDTO> getServices(){
        return  createServiceService.getServices();
    }
}
