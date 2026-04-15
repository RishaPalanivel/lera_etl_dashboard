package lera.etl.dashboard.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import lera.etl.dashboard.Models.Client;
@Component
public interface ClientRepository extends JpaRepository<Client,Long>{
    
}
