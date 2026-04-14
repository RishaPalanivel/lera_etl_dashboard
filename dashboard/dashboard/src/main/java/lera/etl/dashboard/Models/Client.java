package lera.etl.dashboard.Models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lera.etl.dashboard.Constants.Enums.DeploymentStatusEnum;
import lera.etl.dashboard.Constants.Enums.EtlVersionEnum;
import lera.etl.dashboard.Constants.Enums.T24VersionEnum;
import lera.etl.dashboard.Constants.Enums.TestingStatusEnum;
import lombok.Data;

@Entity
@Data
public class Client {
    @Id
    @GeneratedValue
    Long id;

    @NotNull
    // @Schema(name="name",example="EWB,COOP",$comment = "Name should be a single
    // word")
    String name;

    @Enumerated(EnumType.STRING)
    T24VersionEnum t24Version;

    @Enumerated(EnumType.STRING)
    EtlVersionEnum etlVersion;

    String vpnDetails;

    String envDetails;

    String deploymentEnv;

    @Enumerated(EnumType.STRING)
    DeploymentStatusEnum deploymentStatus;

    String deployedOn;

    @Enumerated(EnumType.STRING)
    TestingStatusEnum testingstatus;

    String t24Packs;

    // One-to-Many
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Enclosure> enclosures;

}
