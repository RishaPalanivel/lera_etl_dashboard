package lera.etl.dashboard.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import lera.etl.dashboard.Models.Enclosure;
import lera.etl.dashboard.Service.EnclosureService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class EnclosureController {


@Autowired
public EnclosureService enclosureService;

Logger logger = LoggerFactory.getLogger(ClientController.class);

@PostMapping("/enclosure")
public ResponseEntity<String> addEnclosureController(@RequestBody Enclosure enclosureBody) {
    try {
        enclosureService.addEnclosureService(enclosureBody);
        return new ResponseEntity<String>("enclosure details Added succcessfully",HttpStatus.OK);
    } catch (Exception e) {
        logger.info("catch Error");
        logger.error(e.toString());
        return new ResponseEntity<String>("Couldn't Add enclosure details",HttpStatus.CONFLICT);
    }
}

@GetMapping("/client/{id}/enclosures")
public ResponseEntity<List<Enclosure>> getEnclosureController(@PathVariable Long id) {
    try {
       List<Enclosure> getEnclosureResponse = enclosureService.getEnclosureService(id);
       return new ResponseEntity<List<Enclosure>>(getEnclosureResponse,HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<List<Enclosure>>(HttpStatus.CONFLICT);
    }
}

    
}
