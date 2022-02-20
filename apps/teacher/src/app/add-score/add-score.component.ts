/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kelas } from '../models/kelas';
import { Subject } from '../models/subject';
import { KelasService } from '../services/kelas.service';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';
import { TeacherService } from '../services/teacher.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { LocalstorageService } from '../services/localstorage.service';

export interface ScoreInterface {
  id?: string;
  name?: string;
  nilai?: string;
}
@Component({
  selector: 'teacher-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.css'],
})
export class AddScoreComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  editField!: string;
  idSubject!: any;
  studentData: ScoreInterface[] = [];
  studentData1: ScoreInterface[] = [];
  studentData2: any;
  dataSubject!: Subject;
  infoKelas!: Kelas;
  tempData?: ScoreInterface;
  idUser?: string;
  subjectsData?: any[];
  relatedSubject: string[] = [];
  constructor(
    private studentService: StudentService,
    private subjectService: SubjectService,
    private kelasService: KelasService,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idSubject = params['subjectID'];
    });
    this._teacherInit();
    this._checkSubjectInit();
  }

  private _checkSubjectInit() {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.teacherService.getTeacherByID(this.idUser).subscribe((res) => {
      res.Subject?.forEach((el: any) => {
        this.relatedSubject.push(el._id);
      });
      if (!this.relatedSubject?.includes(this.idSubject)) {
        this.router.navigate(['/not-found']);
      } else {
        this._kelasInit(this.idSubject);
        this._subjectInit(this.idSubject);
        this._studentInit(this.idSubject);
      }
    });
  }

  private _teacherInit() {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.teacherService.getTeacherByID(this.idUser).subscribe((res) => {
      this.subjectsData = res.Subject?.map(
        (el: {
          _id?: string;
          id?: string;
          subject_name?: string;
          teacher_id?: string;
          duration?: string;
        }) => {
          return el.id;
        }
      );
    });
  }

  private _subjectInit(idSubject: any) {
    this.subjectService.getSubjectByID(idSubject).subscribe(
      (res) => {
        this.dataSubject = res;
      },
      () => {},
      () => {}
    );
  }
  private _kelasInit(idSubject: any) {
    this.kelasService.getClassBySubject(idSubject).subscribe(
      (res) => {
        this.infoKelas = res[0];
      },
      () => {},
      () => {}
    );
  }
  private _studentInit(id: any) {
    this.studentService.getAllStudentBySubject(id).subscribe(
      (res) => {
        res.forEach((hes) => {
          const tempScore = hes.subject?.find((el: any) => {
            if (el.subject_name == this.idSubject) {
              return el;
            }
          });
          this.tempData = {
            id: hes.id,
            name: `${hes.first_name} ${hes.last_name}`,
            nilai: tempScore?.score_subject,
          };
          this.studentData1.push(this.tempData);
        });
        this.studentData = this.studentData1;
      },
      () => {},
      () => {}
    );
    this.studentData2 = this.studentData1;
  }

  changeValue(id: number, property: string, event: any) {
    this.studentData2[id][property] = event;
  }

  submit() {
    this.teacherService
      .setStudentScore(this.idSubject, this.studentData2)
      .subscribe(
        (res) => {
          this._snackBar.open('Score Berhasil Di Buat', 'Close', {
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
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      );
  }
}
