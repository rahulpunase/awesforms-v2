import DraggableMetaField from "./DraggableMetaField";
import { metaFields } from "./metaFieldData";

const BasicFields = () => {
  return (
    <div className="w-full flex flex-wrap flex-row items-center justify-between mt-4">
      {metaFields.map((field) => (
        <DraggableMetaField key={field.type} field={field} />
      ))}
    </div>
  );
};

export default BasicFields;
