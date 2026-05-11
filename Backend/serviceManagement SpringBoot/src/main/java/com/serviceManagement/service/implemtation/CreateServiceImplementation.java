package com.serviceManagement.service.implemtation;

import com.serviceManagement.dto.ServiceModelDTO;
import com.serviceManagement.models.ServiceModel;
import com.serviceManagement.repository.ServiceRepository;
import com.serviceManagement.service.CreateServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateServiceImplementation implements CreateServiceService {

    @Autowired
    ServiceRepository serviceRepository;

    @Override
    public ServiceModelDTO createService(ServiceModel serviceModel) {

        ServiceModel saved = serviceRepository.save(serviceModel);

        return new ServiceModelDTO(
                saved.getServiceName(),
                saved.getServiceAddress(),
                saved.getServiceDescription(),
                saved.getServiceType()
        );
    }
}
