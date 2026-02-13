import { BehaviorSubject } from "rxjs";
import {
  DynamicField,
  DynamicForm,
  FieldVariant,
  SwitchFieldProps,
  TextareaFieldProps,
  TextFieldProps,
} from "../../../form-builder/form-builder.types";

interface NodeFormObjectProps {
  label$: BehaviorSubject<string>;
  description$: BehaviorSubject<string>;
  isUpdatable$: BehaviorSubject<boolean>;
  onLabelChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onIsUpdatableChange: (value: boolean) => void;
}

export const getNodeFormObject = ({
  label$,
  description$,
  isUpdatable$,
  onLabelChange,
  onDescriptionChange,
  onIsUpdatableChange,
}: NodeFormObjectProps): DynamicForm => {
  const labelField: DynamicField<TextFieldProps> = {
    label: "Name",
    variant: FieldVariant.TEXT,
    description: "The name/label of the workflow step",
    class: "",
    isRequired: true,
    props: {
      placeholder: "Enter step name (e.g., DRAFT, VALIDATED)",
      value: label$.asObservable(),
      onChange: (value: string) => onLabelChange(value),
    },
  };

  const descriptionField: DynamicField<TextareaFieldProps> = {
    label: "Description",
    variant: FieldVariant.TEXTAREA,
    description: "Describe what this step represents in the workflow",
    class: "",
    isRequired: true,
    props: {
      placeholder: "Enter a description for this step",
      value: description$.asObservable(),
      onChange: (value: string) => onDescriptionChange(value),
      resize: "none",
      rows: 5,
      cols: 50,
    },
  };

  const isUpdatableField: DynamicField<SwitchFieldProps> = {
    label: "Updatable",
    variant: FieldVariant.SWITCH,
    description: "Can the record be updated when in this step?",
    class: "",
    isRequired: true,
    props: {
      checked: isUpdatable$.asObservable(),
      onCheckedChange: (event: boolean) => onIsUpdatableChange(event),
    },
  };

  return {
    title: "",
    description: "",
    class: "",
    isHeaderHidden: true,
    grids: [
      {
        title: "",
        isHeaderHidden: true,
        gridItems: [
          { fields: [labelField] },
          { fields: [descriptionField] },
          { fields: [isUpdatableField] },
        ],
      },
    ],
  };
};
