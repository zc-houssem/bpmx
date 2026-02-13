import { BehaviorSubject } from "rxjs";
import {
  DynamicField,
  DynamicForm,
  FieldVariant,
  TextFieldProps,
} from "../../../form-builder/form-builder.types";

interface GlobalActionsFormObjectProps {
  flowTitle$: BehaviorSubject<string>;
  schemaName$: BehaviorSubject<string>;
  onFlowTitleChange: (value: string) => void;
  onSchemaNameChange: (value: string) => void;
}

export const getGlobalActionsFormObject = ({
  flowTitle$,
  schemaName$,
  onFlowTitleChange,
  onSchemaNameChange,
}: GlobalActionsFormObjectProps): DynamicForm => {
  const flowTitleField: DynamicField<TextFieldProps> = {
    label: "Flow Title",
    variant: FieldVariant.TEXT,
    description: "The title of the workflow (e.g., Invoice Flow)",
    class: "",
    isRequired: true,
    props: {
      placeholder: "Enter workflow title",
      value: flowTitle$.asObservable(),
      onChange: (event: any) => onFlowTitleChange(event.target?.value ?? event),
    },
  };

  const schemaNameField: DynamicField<TextFieldProps> = {
    label: "Schema Name",
    variant: FieldVariant.TEXT,
    description: "The schema name for this workflow (e.g., invoice)",
    class: "",
    isRequired: true,
    props: {
      placeholder: "Enter schema name",
      value: schemaName$.asObservable(),
      onChange: (event: any) => onSchemaNameChange(event.target?.value ?? event),
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
          { fields: [flowTitleField] },
          { fields: [schemaNameField] },
        ],
      },
    ],
  };
};
