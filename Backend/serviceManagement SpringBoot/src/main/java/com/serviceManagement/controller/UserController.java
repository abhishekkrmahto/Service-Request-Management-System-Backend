package com.serviceManagement.controller;

import com.serviceManagement.models.UserModel;
import com.serviceManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("registerUser")
    public Map<String,Object> registerUser(@RequestBody UserModel userModel){
        return userService.registerUser(userModel);
    }

    @PostMapping("/signinUser")
    public Object signinUser(@RequestBody UserModel user){
        Map<String,Object>response = (Map<String, Object>) userService.signin(user);
        return response;
    }
}
