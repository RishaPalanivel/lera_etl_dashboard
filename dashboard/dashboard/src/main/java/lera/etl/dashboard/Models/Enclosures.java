package lera.etl.dashboard.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Enclosures {

@Id
@GeneratedValue
Long id;

String comment;

String date;

//Foreign Key
Long userId;

//Foreign Key
@ManyToOne
@JoinColumn(name="client_id",unique=true,nullable=false)
Client client; 
    
}
