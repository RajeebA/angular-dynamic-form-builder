import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormsService } from "../forms.service";

@Component({
  selector: "app-formbuild",
  templateUrl: "./formbuild.component.html",
  styleUrls: ["./formbuild.component.scss"],
})
export class FormbuildComponent implements OnInit {
  forms: any = [];
  defualtForm: FormGroup;
  allFields = [];
  submitted = false;
  f: any;
  editMode: boolean = false;

  constructor(private formService: FormsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.formService.getJSON().subscribe((data) => {
      let _forms = data.form_elements;
      for (const row of _forms) {
        for (const field of row.elements) {
          this.allFields.push({ ...field, col_type: row.col_type });
        }
      }
      this.allFields = this.allFields.map((field) => ({
        ...field,
        name: field.label.replace(" ", "_").toLowerCase(),
      }));
      this.createForm();
    });
  }
  createForm() {
    let formControlers = {};
    for (const field of this.allFields) {
      if (field.required) {
        formControlers[field.name] = ["", [Validators.required]];
      } else {
        formControlers[field.name] = [""];
      }
    }

    this.defualtForm = this.fb.group(formControlers);
    this.f = this.defualtForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.defualtForm.invalid) {
      return;
    }
  }
  onEdit() {
    this.editMode = !this.editMode;
  }
  onDelete(deletedField) {
    this.allFields = this.allFields.filter(
      (field) => field.name !== deletedField.name
    );
    this.createForm();
  }
}
