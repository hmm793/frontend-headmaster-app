import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from '../../../services/parent.service';
import * as moment from 'moment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

///////////////////////////////////////
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'headmaster-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css'],
})
export class EditParentComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  childCtrl = new FormControl();
  filteredChildren: Observable<string[]>;
  children: string[] = [];
  allChildren: string[] = [];
  parentsId: string[] = [];
  @ViewChild('childInput') childInput: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  formImage!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private parentService: ParentService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private studentService: StudentService,
    private router: Router
  ) {
    this.filteredChildren = this.childCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allChildren.slice()
      )
    );
  }
  idParent: any;
  imageParent: any;
  imageDisplay: any;
  selectedReligion?: any;
  selectedGender?: any;
  selectedStatus?: any;
  selectedBloodGroup?: any;
  religionValue?: string;
  isSubmitted = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  students: any[];
  childInvalid = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idParent = [params['idParent']];
    });
    this._checkParent();
    this._parentInit();
    this._parentImageInit();
    this._childrenInit();
    this.parentEditForm(this.idParent[0]);
  }

  private _checkParent() {
    this.parentService.getAllParent().subscribe((res) => {
      this.parentsId = res.map((element) => {
        return element._id;
      });
      if (!this.parentsId?.includes(this.idParent[0])) {
        this.router.navigate(['/not-found']);
      }
    });
  }

  private _parentInit() {
    this.form = this.formBuilder.group({
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
      status: ['', Validators.required],
      child: [''],
    });
  }
  private _parentImageInit() {
    this.formImage = this.formBuilder.group({
      image: ['', Validators.required],
    });
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

  private parentEditForm(id: any) {
    this.parentService.getParentById(id).subscribe((res) => {
      res.child.forEach((el) => {
        this.children.push(`${el.first_name} ${el.last_name}`);
      });
      this.imageParent = res.image;
      this.parentForm['first_name'].setValue(res.first_name);
      this.parentForm['last_name'].setValue(res.last_name);
      this.parentForm['gender'].setValue(res.gender);
      this.parentForm['date_of_birth'].setValue(
        moment(res.date_of_birth).utc().format('YYYY-MM-DD')
      );
      this.parentForm['occupation'].setValue(res.occupation);
      this.parentForm['blood_group'].setValue(res.blood_group);
      this.parentForm['religion'].setValue(res.religion);
      this.parentForm['email'].setValue(res.email);
      this.parentForm['address'].setValue(res.address);
      this.parentForm['phone'].setValue(res.phone);
      this.parentForm['status'].setValue(res.status);
      // this.parentForm['child'].setValue(res.child);
    });
  }

  editImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formImage.patchValue({ image: file });
      this.formImage.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  editOrtu() {
    this.isSubmitted = true;
    if (this.form.invalid || this.children.length == 0) {
      return;
    }

    const parentData: any = {
      first_name: this.parentForm['first_name'].value,
      last_name: this.parentForm['last_name'].value,
      gender: this.parentForm['gender'].value,
      date_of_birth: this.parentForm['date_of_birth'].value,
      occupation: this.parentForm['occupation'].value,
      blood_group: this.parentForm['blood_group'].value,
      religion: this.parentForm['religion'].value,
      email: this.parentForm['email'].value,
      address: this.parentForm['address'].value,
      phone: this.parentForm['phone'].value,
      status: this.parentForm['status'].value,
      child: JSON.stringify(this.children),
    };

    this.parentService
      .editParentByHeadmaster(this.idParent[0], parentData)
      .subscribe(
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

  submitImage() {
    const imageParent = new FormData();
    Object.keys(this.imageForParentForm).map((key) => {
      imageParent.append(key, this.imageForParentForm[key].value);
    });
    this.parentService
      .editParentImageByHeadmaster(this.idParent[0], imageParent)
      .subscribe(
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

  get parentForm() {
    return this.form.controls;
  }
  get imageForParentForm() {
    return this.formImage.controls;
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