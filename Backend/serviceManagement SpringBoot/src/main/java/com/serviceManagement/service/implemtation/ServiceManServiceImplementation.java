package com.serviceManagement.service.implemtation;

import com.serviceManagement.models.ServiceManModel;
import com.serviceManagement.repository.ServiceManRepository;
import com.serviceManagement.service.ServiceManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ServiceManServiceImplementation implements ServiceManService {

    @Autowired
    ServiceManRepository serviceManRepository;

    @Override
    public Object registerServiceMan(ServiceManModel serviceManModel) {
        Map<String,Object>response = new HashMap<>();
        response.put("code",200);
        response.put("serviceMan",serviceManModel);
        serviceManRepository.save(serviceManModel);
        return response;
    }
}
