package lera.etl.dashboard.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lera.etl.dashboard.Models.Client;
import lera.etl.dashboard.Repository.ClientRepository;

@Service
public class ClientService {
    @Autowired
    public ClientRepository clientRepo;

    public List<Client> getAllClientsService() {
        return clientRepo.findAll(Sort.by("id"));
    }

    public  void addClientService(Client clientBody){
    clientRepo.save(clientBody);
    }

    public void deleteClientService(Long id){
        clientRepo.deleteById(id);
    }
}
