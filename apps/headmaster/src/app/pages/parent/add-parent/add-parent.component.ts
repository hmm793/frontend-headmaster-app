import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentService } from '../../../services/parent.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
////////////////////
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'headmaster-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css'],
})
export class AddParentComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  childCtrl = new FormControl();
  filteredChildren: Observable<string[]>;
  children: string[] = [];
  allChildren: string[] = [];

  @ViewChild('childInput') childInput: ElementRef<HTMLInputElement>;

  ////////////

  form!: FormGroup;
  genderType?: string;
  imageDisplay?: string | ArrayBuffer | undefined;
  selectedGender?: string;
  selectedBloodGroup?: string;
  selectedReligion?: string;
  isSubmitted = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  students: any[];
  childInvalid = true;
  constructor(
    private formbBuilder: FormBuilder,
    private parentService: ParentService,
    private _snackBar: MatSnackBar,
    private studentService: StudentService
  ) {
    this.filteredChildren = this.childCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allChildren.slice()
      )
    );
  }

  ngOnInit(): void {
    this._childrenInit();

    this._formInit();
  }

  private _childrenInit() {
    this.studentService.getAllStudent().subscribe((res) => {
      this.students = res.map((el) => {
        return {
          id: el._id,
          name: el.first_name + ' ' + el.last_name,
        };
      });

      this.students.forEach((el) => {
        this.allChildren.push(el.name);
      });
    });
  }

  private _formInit() {
    this.form = this.formbBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      occupation: ['', Validators.required],
      blood_group: ['', Validators.required],
      religion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      child: [[]],
      image: ['', Validators.required],
    });
  }

  submitData() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const parentData = new FormData();
    Object.keys(this.parentForm).map((key) => {
      if (key == 'child') {
        parentData.append(key, JSON.stringify(this.children));
      } else {
        parentData.append(key, this.parentForm[key].value);
      }
    });
    this.parentService.AddParent(parentData).subscribe(
      (res) => {
        this._snackBar.open(res.message, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (err) => {
        this._snackBar.open(err.error.message, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    );
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  get parentForm() {
    return this.form?.controls;
  }

  add(event: MatChipInputEvent): void {
    // this.childInvalid = false;
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.children.push(value);
    }

    // Clear the input value
    event.chipInput.clear();
    this.childCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.children.indexOf(fruit);

    if (index >= 0) {
      this.children.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.children.push(event.option.viewValue);
    this.childInput.nativeElement.value = '';
    this.childCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allChildren.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
}
