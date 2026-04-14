package lera.etl.dashboard.Security;

import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

private final String SECRET = "Springboot_Etl_Lera_extracttool#12368qrq5twqwqw";
private final Key secretKey = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));


public String generateToken(String userName){
        return Jwts.builder()
        .setSubject(userName)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .signWith(secretKey, SignatureAlgorithm.HS256)
        .compact();
}

        public boolean validateJwttoken(String token){
            try{
               extractUserName(token);
               return true;
            } catch(JwtException exception){
                return false;
            }
            
    }

     public String extractUserName(String token){
              return Jwts.parser()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    
        }
}


