import { FormDetails } from "@/models";
import NoField from "./NoField";
import { Fragment } from "react";
import FieldsLayout from "./FieldsLayout";

const MetaFieldsDroppableContainer = ({
  selectedForm,
  selectedFieldTempId,
}: {
  selectedForm: FormDetails;
  selectedFieldTempId: string;
}) => {
  return (
    <div>
      {selectedForm.pages?.map((page) => (
        <Fragment key={page.pageNumber}>
          <div className="text-center pb-2">Page {page.pageNumber}</div>
          {!page.fields.length && <NoField />}
          {page.fields.map((field) => (
            <div key={field.tempId}>
              <FieldsLayout
                selectedFieldTempId={selectedFieldTempId}
                tempId={field.tempId}
                type={field.type}
                config={field.config}
              />
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default MetaFieldsDroppableContainer;
