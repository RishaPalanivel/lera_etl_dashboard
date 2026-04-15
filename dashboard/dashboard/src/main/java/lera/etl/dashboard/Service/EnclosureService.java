package lera.etl.dashboard.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lera.etl.dashboard.Models.Client;
import lera.etl.dashboard.Models.Enclosure;
import lera.etl.dashboard.Repository.ClientRepository;
import lera.etl.dashboard.Repository.EnclosureRepository;

@Service
public class EnclosureService {

@Autowired
public EnclosureRepository enclosureRepo;
@Autowired
public ClientRepository clientRepo;

public void addEnclosureService(Enclosure enclosureBody){
Long clientId = enclosureBody.getClient().getId();
Client fetchedClient = clientRepo.findById(clientId).orElseThrow();
enclosureBody.setClient(fetchedClient);
enclosureRepo.save(enclosureBody);
}

public List<Enclosure> getEnclosureService(Long id){
return enclosureRepo.findByClientId(id); 
}

}
