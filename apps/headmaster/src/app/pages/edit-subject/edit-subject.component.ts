import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'headmaster-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css'],
})
export class EditSubjectComponent implements OnInit {
  form!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  idSubject: any;
  isSubmitted = false;
  selectedTeacher?: string;
  teacherData?: Teacher[];
  idSubjects: any[] = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idSubject = [params['idSubject']];
    });
    this._checkSubject();
    this._subjectInit();
    this._teacherInit();
  }

  private _checkSubject() {
    this.subjectService.getAllSubjects().subscribe((res) => {
      this.idSubjects = res.map((el) => {
        return el._id;
      });
      if (!this.idSubjects?.includes(this.idSubject[0])) {
        this.router.navigate(['/not-found']);
      } else {
        this.subjectEditForm(this.idSubject[0]);
      }
    });
  }

  private _subjectInit() {
    this.form = this.formBuilder.group({
      subject_name: ['', Validators.required],
      teacher_id: ['', Validators.required],
      duration: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  private subjectEditForm(id: any) {
    this.subjectService.getSubjectById(id).subscribe((res) => {
      console.log('RES : ', res);
      this.subjectForm['subject_name'].setValue(res.subject_name);
      this.subjectForm['teacher_id'].setValue(res.teacher_id._id);
      this.subjectForm['duration'].setValue(res.duration);
      this.subjectForm['link'].setValue(res.link);
    });
  }

  private _teacherInit() {
    this.teacherService.getAllTeacher().subscribe((res) => {
      this.teacherData = res;
    });
  }

  editSubject() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const subjectData: subject = {
      subject_name: this.subjectForm['subject_name'].value,
      teacher_id: this.subjectForm['teacher_id'].value,
      duration: this.subjectForm['duration'].value,
      link: this.subjectForm['link'].value,
    };

    this.subjectService.editSubject(this.idSubject, subjectData).subscribe(
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
    return this.form.controls;
  }
}