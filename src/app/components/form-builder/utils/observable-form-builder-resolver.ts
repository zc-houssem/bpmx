import { Component, Input } from "@angular/core";
import { Observable, of } from "rxjs";
import { DynamicForm } from "../form-builder.types";
import { FormBuilderComponent } from "../form-builder.component";
import { CommonModule } from "@angular/common";
import { getFormBuilderObjectFactory } from "./form-builder-factory";

@Component({
  selector: "sm-observable-form-builder-resolver",
  template: `<sm-form-builder
    [formObject]="(formObject | async) || fallbackForm"
  ></sm-form-builder>`,
  imports: [FormBuilderComponent, CommonModule],
})
export class ObservableFormBuilderResolverComponent {
  @Input() formObject: Observable<DynamicForm> = of(
    getFormBuilderObjectFactory()
  );

  fallbackForm: DynamicForm = getFormBuilderObjectFactory();
}
