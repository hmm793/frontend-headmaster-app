import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { subject } from '../../models/subject';
import { Teacher } from '../../models/teacher';
import { SubjectService } from '../../services/subject.service';
import { TeacherService } from '../../services/teacher.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'headmaster-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  form!: FormGroup;
  currentSubject = null;
  selectedTeacher?: string;
  teacherData: Teacher[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isSubmitted = false;

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private _snackBar: MatSnackBar
  ) {}
  subject: subject[];

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe((result) => {
      this.subject = result;
    });
    this._formInit();
    this._teacherInit();
  }

  deleteSubject(id: string) {
    this.subjectService.deleteSubject(id).subscribe(
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

  private _formInit() {
    this.form = this.formBuilder.group({
      subject_name: ['', Validators.required],
      teacher_id: ['', Validators.required],
      duration: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  private _teacherInit() {
    this.teacherService.getAllTeacher().subscribe((res) => {
      this.teacherData = res;
    });
  }

  submitData() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const subjectData = {
      subject_name: this.form?.value.subject_name,
      teacher_id: this.form?.value.teacher_id,
      duration: this.form?.value.duration,
      link: this.form?.value.link,
    };

    this.subjectService.AddSubject(subjectData).subscribe(
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

  get subjectForm() {
    return this.form?.controls;
  }
}
