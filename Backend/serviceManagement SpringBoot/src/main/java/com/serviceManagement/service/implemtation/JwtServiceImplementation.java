package com.serviceManagement.service.implemtation;

import com.serviceManagement.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//HEADER.PAYLOAD.TOKEN ---> Format
@Service
public class JwtServiceImplementation implements JwtService {
    public final String SECRETE_KEY = "mySuperSecretKeyForJwtTokenGeneration12345"; // must be of 32 chars
    public final SecretKey key = Keys.hmacShaKeyFor(SECRETE_KEY.getBytes());
    @Override
    public Object generateJWT(Object email, Object password) {
        Map<String,Object>payload = new HashMap<>();
        payload.put("email",email);
        payload.put("password",password);
        return Jwts.builder()
                .setClaims(payload)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key)
                .compact();
    }

    @Override
    public Map<String, Object> validateJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        if (claims.getExpiration().before(new Date())) {
            throw new RuntimeException("Token expired");
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("email", claims.get("email"));
        payload.put("password", claims.get("password"));

        return payload;
    }
}
