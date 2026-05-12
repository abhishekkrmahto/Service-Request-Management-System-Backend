package com.serviceManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceModelDTO {
    Long id;
    String userEmail;
    String serviceName;
    String serviceAddress;
    String serviceDescription;
    String serviceType;
    String priority;
    String status;
    String createdAt;
    String updatedAt;
    String assignedTo;

    public ServiceModelDTO(String userEmail, String serviceName, String serviceAddress, String serviceDescription, String serviceType,String priority,String status,String createdAt,String updatedAt,String assignedTo) {
    }

}
