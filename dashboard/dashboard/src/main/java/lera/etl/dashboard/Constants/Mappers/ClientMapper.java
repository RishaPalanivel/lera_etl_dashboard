package lera.etl.dashboard.Constants.Mappers;

import java.util.List;

import org.mapstruct.Mapper;

import lera.etl.dashboard.Constants.Transformers.ClientListingDTO;
import lera.etl.dashboard.Models.Client;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    ClientListingDTO toDTO(Client client);
    
    List<ClientListingDTO> toListDTO(List<Client> clients);

}
