package com.serviceManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ServiceManDTO { private String name;
    private String service;
    private String slot;
    private List<String> assignedServices;
    private String password;
    private String serviceManCode;
    private String serviceType;
}
