package com.serviceManagement.service;

import com.serviceManagement.dto.ServiceModelDTO;
import com.serviceManagement.models.ServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CreateServiceService {
    public ServiceModelDTO createService(ServiceModel serviceModel);
    public List<ServiceModelDTO> getServices();
}
