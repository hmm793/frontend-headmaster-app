import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../../services/teacher.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'headmaster-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  form!: FormGroup;
  imageDisplay?: string | ArrayBuffer | undefined;
  selectedGender?: string;
  selectedBloodGroup?: string;
  selectedReligion?: string;
  isSubmitted = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private formbBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this._formInit();
  }

  private _formInit() {
    this.form = this.formbBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      blood_group: ['', Validators.required],
      religion: ['', Validators.required],
      addmission_date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      short_bio: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  submitData() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const teacherData = new FormData();
    Object.keys(this.teacherForm).map((key) => {
      teacherData.append(key, this.teacherForm[key].value);
    });

    this.teacherService.AddTeacher(teacherData).subscribe(
      (res) => {
        this._snackBar.open(res.message, '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
  get teacherForm() {
    return this.form?.controls;
  }
}
