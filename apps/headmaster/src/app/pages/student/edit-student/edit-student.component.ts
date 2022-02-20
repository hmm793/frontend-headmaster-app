import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../../models/student';
import { KelasServices } from '../../../services/kelas.service';
import { StudentService } from '../../../services/student.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import * as moment from 'moment';
import { kelas } from '../../../models/kelas';
@Component({
  selector: 'headmaster-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  form!: FormGroup;
  formImage!: FormGroup;
  imageStudent: any;
  imageDisplay: any;
  selectedReligion?: any;
  religionValue?: string;
  idUser!: string;
  isSubmitted = false;
  idStudent: any;
  selectedGender?: any;
  selectedBloodGroup?: any;
  selectedClass?: any;
  selectedStatus?: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  classData?: kelas[];
  currentClass?: string;
  studentsId: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private kelasService: KelasServices,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idStudent = [params['idStudent']];
    });
    this._checkStudent();

    this._kelasInit();
    this._studentInit();
    this._studentImageInit();
  }
  private _checkStudent() {
    this.studentService.getAllStudent().subscribe((res) => {
      this.studentsId = res.map((element) => {
        return element._id;
      });
      if (!this.studentsId?.includes(this.idStudent[0])) {
        this.router.navigate(['/not-found']);
      } else {
        this.studentEditForm(this.idStudent[0]);
      }
    });
  }

  private _studentInit() {
    this.form = this.formBuilder.group({
      year_academic: ['', Validators.required],
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
      addmission_date: ['', Validators.required],
      kelas: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      short_bio: ['', Validators.required],
      status_siswa: ['', Validators.required],
    });
  }
  private _studentImageInit() {
    this.formImage = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  private _kelasInit() {
    this.kelasService.getAllClass().subscribe((res) => {
      this.classData = res;
    });
  }

  private studentEditForm(id: any) {
    this.studentService.getStudentById(id).subscribe((res) => {
      this.imageStudent = res.image;
      this.currentClass = res.kelas.class_name;
      this.studentForm['year_academic'].setValue(res.year_academic);
      this.studentForm['first_name'].setValue(res.first_name);
      this.studentForm['last_name'].setValue(res.last_name);
      this.studentForm['gender'].setValue(res.gender);
      this.studentForm['father_name'].setValue(res.father_name);
      this.studentForm['mother_name'].setValue(res.mother_name);
      this.studentForm['date_of_birth'].setValue(
        moment(res.date_of_birth).utc().format('YYYY-MM-DD')
      );
      this.studentForm['father_occupation'].setValue(res.father_occupation);
      this.studentForm['blood_group'].setValue(res.blood_group);
      this.studentForm['religion'].setValue(res.religion);
      this.studentForm['email'].setValue(res.email);
      this.studentForm['addmission_date'].setValue(
        moment(res.addmission_date).utc().format('YYYY-MM-DD')
      );
      this.studentForm['kelas'].setValue(res.kelas.class_name);
      this.studentForm['address'].setValue(res.address);
      this.studentForm['phone'].setValue(res.phone);
      this.studentForm['short_bio'].setValue(res.short_bio);
      this.studentForm['status_siswa'].setValue(res.status);
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
  editSiswa() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    let idKelas;
    this.classData.map((el) => {
      if (el.class_name == this.selectedClass) {
        idKelas = el._id;
      }
    });

    const studentData: Student = {
      first_name: this.studentForm['first_name'].value,
      year_academic: this.studentForm['year_academic'].value,
      last_name: this.studentForm['last_name'].value,
      gender: this.studentForm['gender'].value,
      father_name: this.studentForm['father_name'].value,
      mother_name: this.studentForm['mother_name'].value,
      date_of_birth: this.studentForm['date_of_birth'].value,
      father_occupation: this.studentForm['father_occupation'].value,
      blood_group: this.studentForm['blood_group'].value,
      religion: this.studentForm['religion'].value,
      addmission_date: this.studentForm['addmission_date'].value,
      kelas: idKelas,
      address: this.studentForm['address'].value,
      phone: this.studentForm['phone'].value,
      short_bio: this.studentForm['short_bio'].value,
      status: this.studentForm['status_siswa'].value,
      email: this.studentForm['email'].value,
    };

    this.studentService
      .editStudentByHeadmaster(this.idStudent, studentData)
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
    const imageStudent = new FormData();
    Object.keys(this.imageForStudentForm).map((key) => {
      imageStudent.append(key, this.imageForStudentForm[key].value);
    });

    this.studentService
      .editStudentImageByHeadmaster(this.idStudent, imageStudent)
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

  get studentForm() {
    return this.form.controls;
  }
  get imageForStudentForm() {
    return this.formImage.controls;
  }
}