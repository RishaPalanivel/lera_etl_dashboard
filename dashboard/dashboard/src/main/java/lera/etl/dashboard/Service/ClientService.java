package lera.etl.dashboard.Service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lera.etl.dashboard.Constants.Mappers.ClientMapper;
import lera.etl.dashboard.Constants.Transformers.ClientListingDTO;
import lera.etl.dashboard.Models.Client;
import lera.etl.dashboard.Repository.ClientRepository;

@Service
public class ClientService {
    @Autowired
    public ClientRepository clientRepo;
    @Autowired
    public ClientMapper clientListingMapper;

    public List<ClientListingDTO> getAllClientsService() {
        List<Client> clientList=clientRepo.findAll(Sort.by("id"));
        return clientListingMapper.toListDTO(clientList);
    }

    public void addClientService(Client clientBody) {
        clientRepo.save(clientBody);
    }

    public void deleteClientService(Long id) {
        clientRepo.deleteById(id);
    }

    public Client getClientDetailsService(Long id) {
        return clientRepo.findById(id).orElseThrow();

    }

    public void editClientService(Long id, Client clientBody) {
        Client clientdetails = clientRepo.findById(id).orElseThrow();
        // clientdetails.setClient(clientBody);
        if(clientBody.getName()!=null){
         clientdetails.setName(clientBody.getName());
        }

        if(clientBody.getT24Version()!=null){
         clientdetails.setT24Version(clientBody.getT24Version());
        }

        if(clientBody.getEtlVersion()!=null){
         clientdetails.setEtlVersion(clientBody.getEtlVersion());
        }

        if(clientBody.getVpnDetails()!=null){
         clientdetails.setVpnDetails(clientBody.getVpnDetails());
        }

        if(clientBody.getEnvDetails()!=null){
         clientdetails.setEnvDetails(clientBody.getEnvDetails());
        }

        if(clientBody.getDeploymentEnv()!=null){
         clientdetails.setDeploymentEnv(clientBody.getDeploymentEnv());
        }

        if(clientBody.getDeploymentStatus()!=null){
         clientdetails.setDeploymentStatus(clientBody.getDeploymentStatus());
        }

        if(clientBody.getT24Packs()!=null){
         clientdetails.setT24Packs(clientBody.getT24Packs());
        }

        if(clientBody.getTestingstatus()!=null){
         clientdetails.setTestingstatus(clientBody.getTestingstatus());
        }

        clientRepo.save(clientdetails);
    }
}
