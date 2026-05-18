package com.serviceManagement.service;

import com.serviceManagement.models.ServiceModel;
import com.serviceManagement.models.SignInUserModel;
import com.serviceManagement.models.UserModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface UserService {
    public Map<String,Object>registerUser(UserModel user);
    public Object signin(SignInUserModel user);
    public Object uinfo(String token);
    public List<ServiceModel>getServices(String email);
}
