package com.serviceManagement.service.implemtation;

import com.serviceManagement.models.AdminSigninModel;
import com.serviceManagement.models.ServiceModel;
import com.serviceManagement.models.UserModel;
import com.serviceManagement.repository.ServiceRepository;
import com.serviceManagement.repository.UserRepository;
import com.serviceManagement.service.AdminService;
import com.serviceManagement.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImplementation implements AdminService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    JwtService jwtService;

    @Override
    public Object signin(AdminSigninModel admin) {
        Map<String,Object> response = new HashMap<>();
        try{
            UserModel u = (UserModel) userRepository.validateCredentials(admin.getEmail(),admin.getPassword(),admin.getRole());
            if(u!=null){
                response.put("code",200);
                response.put("jwt",jwtService.generateJWT(u.getEmail(),u.getPassword()));
                response.put("role",u.getRole());
                response.put("email",u.getEmail());
                response.put("name",u.getName());
            }else{
                response.put("code",404);
                response.put("message","INVALID CREDENTIALS !!");
            }
        }catch (Exception e){
            response.put("code",500);
            response.put("message",e.getMessage());
        }
        return response;
    }
    @Override
    public List<ServiceModel> getAllServices() {
        return serviceRepository.findAll();
    }
}
