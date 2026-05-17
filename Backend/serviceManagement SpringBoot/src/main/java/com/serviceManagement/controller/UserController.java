package com.serviceManagement.controller;

import com.serviceManagement.models.SignInUserModel;
import com.serviceManagement.models.UserModel;
import com.serviceManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/registerUser")
    public Map<String,Object> registerUser(@RequestBody UserModel userModel){
        return userService.registerUser(userModel);
    }

    @PostMapping("/signinUser")
    public Object signinUser(@RequestBody SignInUserModel user){
        Map<String,Object>response = (Map<String, Object>) userService.signin(user);
        return response;
    }

    @GetMapping("/userInformation/{token}")
    public Object getUser(@PathVariable String token){ // path variable for url
        return userService.uinfo(token);
    }
}
