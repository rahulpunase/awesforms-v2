import { Binary, BookUser, SpaceIcon, Text, User } from "lucide-react";

import { DefaultFieldData, MetaFields } from "@/models";

const metaFields: MetaFields = [
  {
    displayName: "Single Line",
    Icon: SpaceIcon,
    type: "SINGLE_LINE",
  },
  {
    displayName: "Multi Line",
    Icon: Text,
    type: "MULTI_LINE",
  },
  {
    displayName: "Number",
    Icon: Binary,
    type: "NUMBER",
  },
  {
    displayName: "Address",
    Icon: BookUser,
    type: "ADDRESS",
  },
  {
    displayName: "Name",
    Icon: User,
    type: "NAME",
  },
];

const defaultFieldData: DefaultFieldData = {
  SINGLE_LINE: {
    type: "SINGLE_LINE",
    displayName: "Single Line",
    tempId: "",
    inputName: "singleline",
    config: {
      initialValue: "",
      inputType: "text",
      instruction: "",
      isDisabled: false,
      isVisible: true,
      label: "Edit Label",
      maxCharacterLimit: 255,
      minCharacterLimit: 0,
      placeholderText: "placeholder text",
      isRequired: true,
    },
  },
  MULTI_LINE: {
    type: "MULTI_LINE",
    displayName: "Multi Line",
    tempId: "",
    inputName: "multiline",
    config: {
      characterFormat: "characters",
      inputType: "textarea",
      instruction: "",
      isDisabled: false,
      isVisible: true,
      label: "Multi Line",
      maxCharacterLimit: 1000,
      minCharacterLimit: 0,
      placeholderText: "placeholder text",
      initialValue: "",
      isRequired: false,
    },
  },
  ADDRESS: {
    type: "ADDRESS",
    displayName: "Address",
    tempId: "",
    inputName: "address",
    config: {
      label: "Address",
      instruction: "",
      isDisabled: false,
      isVisible: true,
      isRequired: false,
      inputs: {
        street1: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "Street Address",
          name: "street",
        },
        city: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "City",
          name: "city",
        },
        street2: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "Street Address 2",
          name: "street2",
        },
        country: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "Country",
          name: "country",
        },
        postal: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "Postal/Zip Code",
          name: "postal",
        },
        state: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "State",
          name: "state",
        },
      },
    },
  },
  NUMBER: {
    type: "NUMBER",
    displayName: "Number",
    tempId: "",
    inputName: "number",
    config: {
      inputType: "number",
      instruction: "",
      isDisabled: false,
      isVisible: true,
      label: "Number",
      maxCharacterLimit: 10,
      minCharacterLimit: 0,
      placeholderText: "",
      unit: "",
      isRequired: false,
    },
  },
  NAME: {
    type: "NAME",
    displayName: "Name",
    tempId: "",
    inputName: "name",
    config: {
      label: "Name",
      instruction: "",
      isDisabled: false,
      isVisible: true,
      isRequired: true,
      inputs: {
        firstName: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "First Name",
          name: "firstName",
        },
        lastName: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "Last Name",
          name: "lastName",
        },
        middleName: {
          inputType: "text",
          isRequired: true,
          isVisible: true,
          label: "Middle Name",
          name: "middleName",
        },
      },
    },
  },
};

export { metaFields, defaultFieldData };
