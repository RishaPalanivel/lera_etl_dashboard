package lera.etl.dashboard.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lera.etl.dashboard.Constants.Transformers.ClientListingDTO;
import lera.etl.dashboard.Models.Client;
import lera.etl.dashboard.Service.ClientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class ClientController {
    @Autowired
    public ClientService clientService;
    Logger logger = LoggerFactory.getLogger(ClientController.class);

    // list of all clients
    @GetMapping("/clients")
    ResponseEntity<List<ClientListingDTO>> getAllClientsController() {
        try {
            List<ClientListingDTO> response = clientService.getAllClientsService();
            return new ResponseEntity<List<ClientListingDTO>>(response, HttpStatus.OK);

        } catch (Exception e) {
            logger.info("catch Error");
            logger.error(e.toString());
            return new ResponseEntity<List<ClientListingDTO>>(HttpStatus.NOT_FOUND);
        }

    }

    // create a new client
    @PostMapping("/client")
    public ResponseEntity<String> addClientController(@RequestBody Client clientBody) {
        try {
            clientService.addClientService(clientBody);
            return new ResponseEntity<String>("Client Added Successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Couldnt Add Client", HttpStatus.BAD_REQUEST);
        }
    }

    // edits the client
    @PutMapping("/client/{id}")
    public ResponseEntity<String> editClientController(@PathVariable Long id, @RequestBody Client clientBody) {
        try {
            clientService.editClientService(id, clientBody);
            return new ResponseEntity<String>("Client details Updated succesfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Couldnt Update Client Details", HttpStatus.BAD_REQUEST);
        }
    }

    // delete a client
    @DeleteMapping("/client/{id}")
    public ResponseEntity<String> deleteClientController(@PathVariable Long id) {
        try {
            clientService.deleteClientService(id);
            return new ResponseEntity<String>("Client deleted Successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Couldnt delete Client", HttpStatus.BAD_REQUEST);
        }
    }

    // Get the client details

    @GetMapping("/client/{id}")
    public ResponseEntity<Client> getClientDetailsController(@PathVariable Long id) {
        try {
            Client responseDetails = clientService.getClientDetailsService(id);
            return new ResponseEntity<Client>(responseDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Client>(HttpStatus.CONFLICT);
        }

    }

}
