package lera.etl.dashboard.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import lera.etl.dashboard.Models.Enclosure;

@Component
public interface EnclosureRepository extends JpaRepository<Enclosure,Long> {
    List<Enclosure> findByClientId(Long clientId);
}
