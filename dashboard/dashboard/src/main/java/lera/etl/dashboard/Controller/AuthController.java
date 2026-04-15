package lera.etl.dashboard.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import lera.etl.dashboard.Models.User;
import lera.etl.dashboard.Security.JwtUtils;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AuthController {

    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    public JwtUtils jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> userLoginController(@RequestBody User userBody) {
        String userName = userBody.getUserName();
        if (userName.isEmpty()) {
            return new ResponseEntity<String>("User not Registered", HttpStatus.UNAUTHORIZED);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userName, userBody.getPassword()));

        String actualUsername = authentication.getName();

    if(actualUsername.equals(userName)){
        String token = jwtUtil.generateToken(actualUsername);
    
        return ResponseEntity.ok(Map.of("token", token));
    }
    else{
         return new ResponseEntity<String>("Invalid User", HttpStatus.UNAUTHORIZED);
    }
    }

}
