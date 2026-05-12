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
    String serviceName;
    String serviceAddress;
    String serviceDescription;
    String serviceType;

    public ServiceModelDTO(String serviceName, String serviceAddress, String serviceDescription, String serviceType) {
    }
}
