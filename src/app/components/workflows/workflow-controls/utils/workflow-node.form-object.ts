import { of } from "rxjs";
import {
  DynamicField,
  DynamicForm,
  FieldVariant,
  SwitchFieldProps,
  TextareaFieldProps,
  TextFieldProps,
} from "../../../form-builder/form-builder.types";

interface WorkflowNodeFormObjectProps {}

export const getWorkflowNodeFormObjectFactory =
  ({}: WorkflowNodeFormObjectProps): DynamicForm => {
    const labelField: DynamicField<TextFieldProps> = {
      label: "Name",
      variant: FieldVariant.TEXT,
      description: "Please enter the name of the node",
      class: "",
      isRequired: true,
      props: {
        placeholder: "Enter a name",
      },
    };

    const descriptionField: DynamicField<TextareaFieldProps> = {
      label: "Description",
      variant: FieldVariant.TEXTAREA,
      description: "Please enter the description of the node",
      class: "",
      isRequired: true,
      props: {
        placeholder: "Enter a description",
        resize: "none",
        rows: 10,
        cols: 50,
      },
    };

    const isUpdatableField: DynamicField<SwitchFieldProps> = {
      label: "Updatable",
      variant: FieldVariant.SWITCH,
      description: "Is the node updatable?",
      class: "",
      isRequired: true,
      props: {
        checked: of(true),
      },
    };

    return {
      title: "",
      description: "",
      class: "",
      grids: [
        {
          title: "",
          isHeaderHidden: true,
          gridItems: [
            {
              fields: [labelField],
            },
            { fields: [descriptionField] },
            {
              fields: [isUpdatableField],
            },
          ],
        },
      ],
    };
  };
