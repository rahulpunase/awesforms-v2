import { KnownFieldConfig, MetaFieldType, UnknownFieldConfig } from "@/models";

import AddressFieldLayout from "./AddressFieldLayout";
import MultiLineFieldLayout from "./MultiLineFieldLayout";
import SingleLineFieldLayout from "./SingleLineFieldLayout";

const FieldsLayout = ({
  tempId,
  type,
  config,
  selectedFieldTempId,
}: {
  tempId: string;
  type: MetaFieldType;
  config: UnknownFieldConfig;
  selectedFieldTempId: string;
}) => {
  if (type === "SINGLE_LINE") {
    return (
      <SingleLineFieldLayout
        selectedFieldTempId={selectedFieldTempId}
        tempId={tempId}
        config={config as KnownFieldConfig<"SINGLE_LINE">}
      />
    );
  }
  if (type === "MULTI_LINE") {
    return (
      <MultiLineFieldLayout
        selectedFieldTempId={selectedFieldTempId}
        tempId={tempId}
        config={config as KnownFieldConfig<"MULTI_LINE">}
      />
    );
  }

  if (type === "ADDRESS") {
    return (
      <AddressFieldLayout
        selectedFieldTempId={selectedFieldTempId}
        tempId={tempId}
        config={config as KnownFieldConfig<"ADDRESS">}
      />
    );
  }
  return <></>;
};

export default FieldsLayout;
