package lera.etl.dashboard.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Client {
    @Id
    @GeneratedValue
    Long id;

    @NotNull
    //@Schema(name="name",example="EWB,COOP",$comment = "Name should be a single word")
    String name;

    String t24Version;
    String etlVersion;
}
