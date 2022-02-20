/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../../services/localstorage.service';
import { StudentService } from '../../../services/student.service';
interface gradeInterface {
  'Subject Name': string;
  score: number;
}

@Component({
  selector: 'student-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private localstorageService: LocalstorageService
  ) {}

  studentData: any[] = [];

  displayedColumns: string[] = ['Subject Name', 'score'];
  grades: gradeInterface[] = [];
  grades2: gradeInterface[] = [];
  idUser!: string;

  ngOnInit(): void {
    this._studentInit();
  }

  private _studentInit() {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;

    this.studentService.getStudentByID(this.idUser).subscribe((res) => {
      res.subject?.forEach((el) => {
        this.studentData.push(el);
      });
      this.studentData.forEach((el) => {
        this.grades2.push({
          'Subject Name': el.subject_name.subject_name,
          score: parseInt(el.score_subject),
        });
      });
      // console.log(this.grades2);
      this.grades = this.grades2;
    });
  }
}
