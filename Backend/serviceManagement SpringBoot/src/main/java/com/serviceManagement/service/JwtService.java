package com.serviceManagement.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface JwtService {
    public Object generateJWT(Object email, Object password);
    public Map<String, Object> validateJWT(String token);
}
