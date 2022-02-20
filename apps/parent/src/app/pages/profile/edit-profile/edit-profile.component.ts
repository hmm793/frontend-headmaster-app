/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Parent } from '../../../models/parent';
import { LocalstorageService } from '../../../services/localstorage.service';
import { ParentService } from '../../../services/parent.service';

@Component({
  selector: 'parent-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup;
  formImage!: FormGroup;
  isSubmitted = false;
  imageParent: any;
  imageDisplay: any;
  selectedReligion?: any;
  selectedGender?: any;
  selectedBloodGroup?: any;
  religionValue?: string;
  idUser?: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private parentService: ParentService,
    private formBuilder: FormBuilder,
    private localstorageService: LocalstorageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this._parentInit();
    this._parentImageInit();
    this.parentEditForm(this.idUser);
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
      email: ['', [Validators.email, Validators.required]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  private _parentImageInit() {
    this.formImage = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }

  private parentEditForm(id: any) {
    this.parentService.getParentById(id).subscribe((res) => {
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
  editParent() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const parentData: Parent = {
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
      // password: this.parentForm['password'].value,
    };

    this.parentService.editByParent(this.idUser, parentData).subscribe(
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
    Object.keys(this.imageForparentForm).map((key) => {
      imageParent.append(key, this.imageForparentForm[key].value);
    });

    this.parentService
      .editParentImageByParent(this.idUser, imageParent)
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
  get imageForparentForm() {
    return this.formImage.controls;
  }
}
