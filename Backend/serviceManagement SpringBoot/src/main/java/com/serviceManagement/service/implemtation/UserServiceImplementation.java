package com.serviceManagement.service.implemtation;

import com.serviceManagement.dto.UserDTO;
import com.serviceManagement.models.SignInUserModel;
import com.serviceManagement.models.UserModel;
import com.serviceManagement.repository.UserRepository;
import com.serviceManagement.service.JwtService;
import com.serviceManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtService jwtService;

    @Override
    public Map<String, Object> registerUser(UserModel user) {
        userRepository.save(user);
        Map<String,Object>response = new HashMap<>();
        response.put("code",200);
        response.put("userDto",new UserDTO(user.getName(),user.getPhone(),user.getAddress(),user.getEmail(),user.getPassword(), user.getAssignedServiceman(),user.getRole()));
        return response;
    }

    @Override
    public Object signin(SignInUserModel user) {
        // validate first
        Map<String,Object>response = new HashMap<>();
        try{
           UserModel u = (UserModel) userRepository.validateCredentials(user.getEmail(),user.getPassword());
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
    public Object uinfo(String token) {
        Map<String, Object> response = new HashMap<>();
        try
        {
            Map<String, Object> payload = jwtService.validateJWT(token);
            String email = (String) payload.get("email");
            UserModel U = (UserModel) userRepository.findByEmail(email);
            if(U!=null){
                response.put("code", 200);
                response.put("name", U.getName());
                response.put("address",U.getAddress());
                response.put("phone",U.getPhone());
                response.put("email",U.getEmail());
            }else{
                response.put("code",404);
                response.put("message","Token Expired or Something is wrong !!");
            }
        }catch(Exception e)
        {
            response.put("code", 500);
            response.put("message", e.getMessage());
        }
        return response;
    }
}
