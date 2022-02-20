/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ForgetPasswordComponent } from '../../forget-password/forget-password.component';

@Component({
  selector: 'teacher-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginFormGroup!: FormGroup;
  authError = false;
  authMessage = 'Email or Password are wrong';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private localstorage: LocalstorageService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }
  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.authorizationService
      .login(this.loginForm['email'].value, this.loginForm['password'].value)
      .subscribe(
        (user) => {
          this.authError = false;
          this.localstorage.setToken(user.token);
          this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the server. Plese try again later!';
            this._snackBar.open(this.authMessage, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else {
            this._snackBar.open(this.authMessage, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        },
        () => {}
      );
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ForgetPasswordComponent, dialogConfig);
    dialogRef.afterClosed();
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
