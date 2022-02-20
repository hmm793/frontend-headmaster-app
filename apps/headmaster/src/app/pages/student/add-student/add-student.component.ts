import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { KelasServices } from '../../../services/kelas.service';
import { kelas } from '../../../models/kelas';
@Component({
  selector: 'headmaster-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  form!: FormGroup;
  selectedGender?: string;
  selectedBloodGroup?: string;
  selectedReligion?: string;
  selectedClass?: string;
  isSubmitted = false;
  imageDisplay?: string | ArrayBuffer | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  allClass?: kelas[];
  constructor(
    private formbBuilder: FormBuilder,
    private studentService: StudentService,
    private _snackBar: MatSnackBar,
    private kelasServices: KelasServices
  ) {}

  ngOnInit(): void {
    this._formInit();
    this._classInit();
  }

  private _formInit() {
    this.form = this.formbBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      father_name: ['', Validators.required],
      mother_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      father_occupation: ['', Validators.required],
      blood_group: ['', Validators.required],
      religion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      year_academic: ['', Validators.required],
      addmission_date: ['', Validators.required],
      kelas: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      short_bio: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  private _classInit() {
    this.kelasServices.getAllClass().subscribe((res) => {
      this.allClass = res;
    });
  }

  submitData() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const studentData = new FormData();
    Object.keys(this.studentForm).map((key) => {
      studentData.append(key, this.studentForm[key].value);
    });
    this.studentService.AddStudent(studentData).subscribe(
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
  get studentForm() {
    return this.form?.controls;
  }
}
