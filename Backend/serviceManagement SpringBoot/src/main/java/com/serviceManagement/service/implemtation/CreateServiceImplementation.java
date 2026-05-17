package com.serviceManagement.service.implemtation;

import com.serviceManagement.dto.ServiceModelDTO;
import com.serviceManagement.models.ServiceModel;
import com.serviceManagement.repository.ServiceRepository;
import com.serviceManagement.service.CreateServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CreateServiceImplementation implements CreateServiceService {

    @Autowired
    ServiceRepository serviceRepository;

    @Override
    public ServiceModelDTO createService(ServiceModel serviceModel) {

        ServiceModel saved = serviceRepository.save(serviceModel);

        return new ServiceModelDTO(
                saved.getUserEmail(),
                saved.getServiceName(),
                saved.getServiceAddress(),
                saved.getServiceDescription(),
                saved.getServiceType(),
                saved.getPriority(),
                saved.getStatus(),
                saved.getCreatedAt(),
                saved.getUpdatedAt(),
                saved.getAssignedTo()
        );
    }

    @Override
    public List<ServiceModelDTO> getServices() {
        List<ServiceModel> responseOfModel = serviceRepository.findAll();
        List<ServiceModelDTO>responseOfModelDTO = new ArrayList<>();
        for(ServiceModel s:responseOfModel){
            ServiceModelDTO serviceModelDTO = new ServiceModelDTO(s.getUserEmail(),s.getServiceName(),s.getServiceAddress(),s.getServiceDescription(),s.getServiceType(),s.getPriority(),s.getStatus(),s.getCreatedAt(),s.getUpdatedAt(),s.getAssignedTo());
            responseOfModelDTO.add(serviceModelDTO);
        }
        return responseOfModelDTO;
    }
}
