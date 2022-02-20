import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../../../models/teacher';
import { TeacherService } from '../../../services/teacher.service';
import * as moment from 'moment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LocalstorageService } from '../../../services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'headmaster-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
})
export class EditTeacherComponent implements OnInit {
  form!: FormGroup;
  formImage!: FormGroup;
  imageTeacher: any;
  imageDisplay: any;
  religionValue?: string;
  isSubmitted = false;
  idUser?: any;
  selectedReligion?: any;
  selectedGender?: any;
  selectedBloodGroup?: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  teachersId: string[] = [];

  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUser = [params['idTeacher']];
    });
    this._checkTeacher();
    this._teachertInit();
    this._teacherImageInit();
  }

  private _checkTeacher() {
    this.teacherService.getAllTeacher().subscribe((res) => {
      this.teachersId = res.map((element) => {
        return element._id;
      });
      if (!this.teachersId?.includes(this.idUser[0])) {
        this.router.navigate(['/not-found']);
      } else {
        this.teacherEditForm(this.idUser[0]);
      }
    });
  }

  private _teachertInit() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      blood_group: ['', Validators.required],
      religion: ['', Validators.required],
      addmission_date: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      short_bio: ['', Validators.required],
    });
  }

  private _teacherImageInit() {
    this.formImage = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  private teacherEditForm(id: any) {
    this.teacherService.getTeacherByID(id).subscribe((res) => {
      this.imageTeacher = res.image;
      console.log(this.imageTeacher);
      this.teacherForm['first_name'].setValue(res.first_name);
      this.teacherForm['last_name'].setValue(res.last_name);
      this.teacherForm['gender'].setValue(res.gender);
      this.teacherForm['date_of_birth'].setValue(
        moment(res.date_of_birth).utc().format('YYYY-MM-DD')
      );
      this.teacherForm['blood_group'].setValue(res.blood_group);
      this.teacherForm['religion'].setValue(res.religion);
      this.teacherForm['addmission_date'].setValue(
        moment(res.addmission_date).utc().format('YYYY-MM-DD')
      );
      this.teacherForm['email'].setValue(res.email);
      this.teacherForm['address'].setValue(res.address);
      this.teacherForm['phone'].setValue(res.phone);
      this.teacherForm['short_bio'].setValue(res.short_bio);
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
  editTeacher() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const teacherData: Teacher = {
      first_name: this.teacherForm['first_name'].value,
      last_name: this.teacherForm['last_name'].value,
      gender: this.teacherForm['gender'].value,
      date_of_birth: this.teacherForm['date_of_birth'].value,
      blood_group: this.teacherForm['blood_group'].value,
      religion: this.teacherForm['religion'].value,
      addmission_date: this.teacherForm['addmission_date'].value,
      email: this.teacherForm['email'].value,
      address: this.teacherForm['address'].value,
      phone: this.teacherForm['phone'].value,
      short_bio: this.teacherForm['short_bio'].value,
    };

    this.teacherService
      .editTeacherByHeadmaster(this.idUser[0], teacherData)
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
    const imageTeacher = new FormData();
    Object.keys(this.imageForTeacherForm).map((key) => {
      imageTeacher.append(key, this.imageForTeacherForm[key].value);
    });

    this.teacherService
      .editTeacherImageByHeadmaster(this.idUser[0], imageTeacher)
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

  get teacherForm() {
    return this.form.controls;
  }
  get imageForTeacherForm() {
    return this.formImage.controls;
  }
}