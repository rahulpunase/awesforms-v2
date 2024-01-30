import { KnownFieldConfig, MetaFieldType, UnknownFieldConfig } from "@/models";

import AddressFieldLayout from "./AddressFieldLayout";
import MultiLineFieldLayout from "./MultiLineFieldLayout";
import NameFieldLayout from "./NameFieldLayout";
import NumberFieldLayout from "./NumberFieldLayout";
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

  if (type === "NUMBER") {
    return (
      <NumberFieldLayout
        selectedFieldTempId={selectedFieldTempId}
        tempId={tempId}
        config={config as KnownFieldConfig<"NUMBER">}
      />
    );
  }

  if (type === "NAME") {
    return (
      <NameFieldLayout
        selectedFieldTempId={selectedFieldTempId}
        tempId={tempId}
        config={config as KnownFieldConfig<"NAME">}
      />
    );
  }
  return <></>;
};

export default FieldsLayout;
