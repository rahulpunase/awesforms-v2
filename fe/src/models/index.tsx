import { LucideIcon } from "lucide-react";

export type RFCWithChildren = { children: React.ReactElement };
export type OrganizationDetails = {
  name: string;
  imageUrl: string;
  role: string;
  id: string;
};
export type Profile = {
  email: string;
  imageUrl: string;
  name: string;
  org?: OrganizationDetails;
};

export type UserProfileResponse = {
  profile: Profile;
};

export type ProfileSliceInitialState = {
  isProfileFetching: boolean;
  isLoading: boolean;
  profile: Profile | null;
  userId: string;
};

export type FormDetailsResponse = {
  formDetails: FormDetails[];
};

export type CreateFormResponse = {
  form: FormDetails;
};

export type BuilderSliceInitialState = {
  isLoading: boolean;
  formDetails: FormDetails[];
  selectedForm: FormDetails | null;
  selectedTempId: string;
  isFormUpdateSaving: boolean;
};

export type MetaFieldType =
  | "SINGLE_LINE"
  | "MULTI_LINE"
  | "NUMBER"
  | "NAME"
  | "ADDRESS";

export type Field = {
  displayName: string;
  type: MetaFieldType;
};

export type MetaFieldBase = Field & {
  Icon: LucideIcon;
};

export type DraggableAndDroppableItems = {
  id: MetaFieldType;
};

export type MetaFields = MetaFieldBase[];

export type InputType = "text" | "number" | "checkbox" | "select" | "textarea";

type CommonInputFieldConfig = {
  label: string;
  inputType: InputType;
  maxCharacterLimit: number;
  minCharacterLimit: number;
  instruction: string;
  placeholderText: string;
  isVisible: boolean;
  isDisabled: boolean;
  isRequired: boolean;
};

export type AdditionalInput = {
  inputType: InputType;
  label: string;
  initialValue: string;
  placeholderText: string;
  inputName: string;
};

type SingleLineFieldConfig = {
  initialValue: string;
} & CommonInputFieldConfig;

type MultiLineFieldConfig = {
  characterFormat: "characters" | "words";
  initialValue: string;
} & CommonInputFieldConfig;

type NameFieldConfiguration = {
  label: string;
  instruction: string;
  isVisible: boolean;
  isDisabled: boolean;
  isRequired: boolean;
  inputs: AdditionalInput[];
};

export type AdditionalAddressInputsConfig = {
  label: string;
  isRequired: boolean;
  name: string;
  isVisible: boolean;
  inputType: string;
};

export type AdditionalAddressInputs = {
  street1: AdditionalAddressInputsConfig;
  street2: AdditionalAddressInputsConfig;
  city: AdditionalAddressInputsConfig;
  state: AdditionalAddressInputsConfig;
  postal: AdditionalAddressInputsConfig;
  country: AdditionalAddressInputsConfig;
};

export type AdditionalAddressInputsKeys = keyof AdditionalAddressInputs;

type AddressFieldConfig = {
  label: string;
  instruction: string;
  isVisible: boolean;
  isDisabled: boolean;
  isRequired: boolean;
  inputs: AdditionalAddressInputs;
};

type NumberFieldConfiguration = {
  unit: string;
} & CommonInputFieldConfig;

export type UnknownFieldConfig =
  | SingleLineFieldConfig
  | MultiLineFieldConfig
  | AddressFieldConfig
  | NumberFieldConfiguration
  | NameFieldConfiguration;

export type KnownFieldConfig<K> = K extends "SINGLE_LINE"
  ? SingleLineFieldConfig
  : K extends "MULTI_LINE"
  ? MultiLineFieldConfig
  : K extends "ADDRESS"
  ? AddressFieldConfig
  : K extends "NUMBER"
  ? NumberFieldConfiguration
  : K extends "NAME"
  ? NameFieldConfiguration
  : never;

export type ToUpdateConfig<K> = {
  [key in keyof KnownFieldConfig<K>]?: KnownFieldConfig<K>[key];
};

export type DefaultFieldDataConfig<K> = Field & {
  tempId: string;
  config: KnownFieldConfig<K>;
  inputName: string;
};

export type OptionalField =
  | DefaultFieldDataConfig<"SINGLE_LINE">
  | DefaultFieldDataConfig<"MULTI_LINE">
  | DefaultFieldDataConfig<"NUMBER">
  | DefaultFieldDataConfig<"NAME">
  | DefaultFieldDataConfig<"ADDRESS">;

export type DefaultFieldData = {
  [key in MetaFieldType]: DefaultFieldDataConfig<key>;
};

export type FormPages = {
  isSelected: boolean;
  isVisible: boolean;
  pageNumber: number;
  fields: OptionalField[];
};

export type FormDetails = {
  description: string;
  displayName: string;
  id: string;
  isDeleted: string | boolean;
  isDeployed: string | boolean;
  isShared: string | boolean;
  organizationId: string;
  profileId: string;
  resetButtonLabel?: string;
  savedButtonLabel?: string;
  type: string;
  pages: FormPages[];
};

export type FieldLayoutProps<T> = {
  tempId: string;
  config: KnownFieldConfig<T>;
  selectedFieldTempId: string;
};

export type ConfigEditorProps<T> = {
  config: KnownFieldConfig<T>;
  tempId: string;
};
