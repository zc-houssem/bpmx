import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  visible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  toggle(): void {
    this.visible.next(!this.visible.value);
    console.log(this.visible.value);
  }
}
