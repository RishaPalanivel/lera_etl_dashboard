package lera.etl.dashboard.Security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private InMemoryUserDetailsManager  userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
            String authheader = request.getHeader("Authorization");

            if(authheader!=null && authheader.startsWith("Bearer")){
                String token = authheader.substring(7);
                if(jwtUtils.validateJwttoken(token)){
                    String userName = jwtUtils.extractUserName(token);
                    var userDetails = userDetailsService.loadUserByUsername(userName);
                    var auth= new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
            
            filterChain.doFilter(request, response);
    }
     


}
