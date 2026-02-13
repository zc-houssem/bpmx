import { BehaviorSubject } from "rxjs";
import {
  DynamicField,
  DynamicForm,
  FieldVariant,
  SelectFieldProps,
  SelectOption,
  SwitchFieldProps,
  TextFieldProps,
} from "../../../form-builder/form-builder.types";

interface EdgeFormObjectProps {
  label$: BehaviorSubject<string>;
  validation$: BehaviorSubject<string>;
  hidden$: BehaviorSubject<boolean>;
  targetNode$: BehaviorSubject<SelectOption | undefined>;
  nodeOptions$: BehaviorSubject<SelectOption[]>;
  onLabelChange: (value: string) => void;
  onValidationChange: (value: string) => void;
  onHiddenChange: (value: boolean) => void;
  onTargetNodeChange: (value: SelectOption) => void;
}

export const getEdgeFormObject = ({
  label$,
  validation$,
  hidden$,
  targetNode$,
  nodeOptions$,
  onLabelChange,
  onValidationChange,
  onHiddenChange,
  onTargetNodeChange,
}: EdgeFormObjectProps): DynamicForm => {
  const labelField: DynamicField<TextFieldProps> = {
    label: "Action Label",
    variant: FieldVariant.TEXT,
    description: "The label for this transition action (e.g., VALIDATE, SEND)",
    class: "",
    isRequired: true,
    props: {
      placeholder: "Enter action label",
      value: label$.asObservable(),
      onChange: (value: string) => onLabelChange(value),
    },
  };

  const validationField: DynamicField<TextFieldProps> = {
    label: "Validation Rule",
    variant: FieldVariant.TEXT,
    description: "Optional validation rule to execute before transition",
    class: "",
    isRequired: false,
    props: {
      placeholder: "Enter validation rule (optional)",
      value: validation$.asObservable(),
      onChange: (value: string) => onValidationChange(value),
    },
  };

  const targetNodeField: DynamicField<SelectFieldProps> = {
    label: "Target Step",
    variant: FieldVariant.TEXT, // Using TEXT as fallback since SELECT may not be available
    description: "The target step this transition leads to",
    class: "",
    isRequired: true,
    props: {
      placeholder: "Select target step",
      options: nodeOptions$.asObservable(),
      value: targetNode$.asObservable(),
      onSelectChange: (event: SelectOption) => onTargetNodeChange(event),
    },
  };

  const hiddenField: DynamicField<SwitchFieldProps> = {
    label: "Hidden",
    variant: FieldVariant.SWITCH,
    description: "Hide this transition from the UI (for automatic transitions)",
    class: "",
    isRequired: false,
    props: {
      checked: hidden$.asObservable(),
      onCheckedChange: (event: boolean) => onHiddenChange(event),
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
          { fields: [validationField] },
          { fields: [hiddenField] },
        ],
      },
    ],
  };
};
