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

import lera.etl.dashboard.Models.Client;
import lera.etl.dashboard.Service.ClientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class ClientController {
    @Autowired
    public ClientService clientService;
    Logger logger = LoggerFactory.getLogger(ClientController.class);

    @GetMapping("/clients")
    ResponseEntity<List<Client>> getAllClientsController() {
        try {
            List<Client> response = clientService.getAllClientsService();
            return new ResponseEntity<List<Client>>(response, HttpStatus.OK);

        } catch (Exception e) {
            logger.info("catch Error");
            logger.error(e.toString());
            return new ResponseEntity<List<Client>>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/client")
    public ResponseEntity<String> addClientController(@RequestBody Client clientBody) {
       try {
        clientService.addClientService(clientBody);
        return new ResponseEntity<String>("Client Added Successfully",HttpStatus.OK);  
       } catch (Exception e) {
        return new ResponseEntity<String>("Couldnt Add Client",HttpStatus.BAD_REQUEST);
       }
    }
    
   @DeleteMapping("/client/{id}")
   public ResponseEntity<String> deleteClientController(@PathVariable Long id) {
       try {
        clientService.deleteClientService(id);
        return new ResponseEntity<String>("Client deleted Successfully",HttpStatus.OK);  
       } catch (Exception e) {
        return new ResponseEntity<String>("Couldnt delete Client",HttpStatus.BAD_REQUEST);
       }
    }

}
