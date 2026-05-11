package com.serviceManagement.service;

import com.serviceManagement.models.UserModel;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface UserService {
    public Map<String,Object>registerUser(UserModel user);
    public Object signin(UserModel user);
    public Object uinfo(String token);
}
