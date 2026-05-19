package com.serviceManagement.service;

import com.serviceManagement.models.AdminSigninModel;
import com.serviceManagement.models.ServiceModel;
import com.serviceManagement.models.SignInUserModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {
    public Object signin(AdminSigninModel admin);
    public List<ServiceModel>getAllServices();
}
