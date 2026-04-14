package lera.etl.dashboard.Constants.Transformers;

import lera.etl.dashboard.Constants.Enums.EtlVersionEnum;
import lera.etl.dashboard.Constants.Enums.T24VersionEnum;
import lombok.Data;

@Data
public class ClientListingDTO {

    String name;

    T24VersionEnum t24Version;

    EtlVersionEnum etlVersion;

}
