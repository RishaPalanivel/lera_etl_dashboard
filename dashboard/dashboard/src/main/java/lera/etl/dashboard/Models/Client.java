package lera.etl.dashboard.Models;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Client {
    @Id
    @GeneratedValue
    Long id;

    @Nonnull
    //@Schema(name="name",example="EWB,COOP",$comment = "Name should be a single word")
    String name;

    String t24Version;
    String etlVersion;
}
