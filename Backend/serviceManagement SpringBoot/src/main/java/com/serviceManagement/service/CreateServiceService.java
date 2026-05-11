package com.serviceManagement.service;

import com.serviceManagement.dto.ServiceModelDTO;
import com.serviceManagement.models.ServiceModel;
import org.springframework.stereotype.Service;

@Service
public interface CreateServiceService {
    public ServiceModelDTO createService(ServiceModel serviceModel);
}
