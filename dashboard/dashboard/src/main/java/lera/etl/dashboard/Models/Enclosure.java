package lera.etl.dashboard.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Enclosure {

@Id
@GeneratedValue
Long id;

String comment;

String date;

//Foreign Key
//Long userId;

// //Foreign Key
@ManyToOne
@JoinColumn(name="client_id",nullable=false)
Client client; 
    
}
