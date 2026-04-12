package lera.etl.dashboard.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lera.etl.dashboard.Constants.Enums.DeploymentStatusEnum;
import lera.etl.dashboard.Constants.Enums.TestingStatusEnum;
import lombok.Data;

@Entity
@Data
public class DeploymentDetails {
@Id
@GeneratedValue
Long id;

String env;

@Enumerated(EnumType.STRING)
DeploymentStatusEnum deploymentStatus;

String deployedOn;

@Enumerated(EnumType.STRING)
TestingStatusEnum testingstatus;

String t24Packs;

//Foreign Key
@NotNull
@OneToOne
@JoinColumn(name="client_id",unique=true,nullable=false)
Client client;   
}
