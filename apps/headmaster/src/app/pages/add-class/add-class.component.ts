import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { subject } from '../../models/subject';
import { Teacher } from '../../models/teacher';
import { KelasServices } from '../../services/kelas.service';
import { SubjectService } from '../../services/subject.service';
import { TeacherService } from '../../services/teacher.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'headmaster-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedValue: string[] = [];
  selectedTeacher = '';
  isSubmitted = false;
  allSubject: subject[];
  allTeacher: Teacher[];
  form!: FormGroup;

  constructor(
    private formbBuilder: FormBuilder,
    private kelasService: KelasServices,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._formInit();
    this._subjectInit();
    this._teacherInit();
  }

  private _formInit() {
    this.form = this.formbBuilder.group({
      class_name: ['', Validators.required],
      teacher_id: [''],
      subject: [''],
    });
  }

  private _subjectInit() {
    this.subjectService.getAllSubjects().subscribe((subj) => {
      this.allSubject = subj;
    });
  }
  private _teacherInit() {
    this.teacherService.getAllTeacher().subscribe((teach) => {
      this.allTeacher = teach;
    });
  }

  submitData() {
    this.isSubmitted = true;
    if (
      this.form.invalid ||
      this.selectedTeacher.length == 0 ||
      this.selectedValue.length == 0
    ) {
      return;
    }

    const kelasData = {
      class_name: this.form?.value.class_name,
      teacher: this.selectedTeacher,
      subject: this.selectedValue,
    };

    console.log(kelasData);
    this.kelasService.AddClass(kelasData).subscribe(
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
  get classForm() {
    return this.form?.controls;
  }
}
