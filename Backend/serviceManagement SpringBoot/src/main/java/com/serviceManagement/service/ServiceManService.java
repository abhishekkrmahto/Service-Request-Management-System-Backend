package com.serviceManagement.service;

import com.serviceManagement.models.ServiceManModel;
import org.springframework.stereotype.Service;


@Service
public interface ServiceManService {
    public Object registerServiceMan(ServiceManModel serviceManModel);
}
