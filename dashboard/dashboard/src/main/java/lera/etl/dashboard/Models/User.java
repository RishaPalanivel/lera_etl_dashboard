package lera.etl.dashboard.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@Builder
@Table(name="UserTable")
public class User {

@Id
@GeneratedValue
Long Id;

@NotNull
String userName;

@NotNull
String password;
}
