import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
import { ParentService } from '../../services/parent.service';
import { StudentService } from '../../services/student.service';

interface gradeInterface {
  'Subject Name': string;
  score: number;
}
@Component({
  selector: 'parent-score-info',
  templateUrl: './score-info.component.html',
  styleUrls: ['./score-info.component.css'],
})
export class ScoreInfoComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private parentService: ParentService,
    private route: ActivatedRoute,
    private router: Router,
    private localstorageService: LocalstorageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  studentData: any[] = [];
  idStudent: any;
  displayedColumns: string[] = ['Subject Name', 'score'];
  grades: gradeInterface[] = [];
  grades2: gradeInterface[] = [];
  idUser?: string;
  children: any[] = [];
  children2?: any[];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idStudent = params['idStudent'];
    });
    this._parentInit();
  }
  private _parentInit() {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.parentService.getParentById(this.idUser).subscribe((res) => {
      res.child?.forEach((el: any) => {
        this.children.push(el._id.toString());
      });
      this.children2 = this.children;
      if (!this.children.includes(this.idStudent)) {
        this.router.navigate(['/not-found']);
      } else {
        this._studentInit(this.idStudent);
      }
    });
  }

  private _studentInit(id: any) {
    this.studentService.getStudentByID(id).subscribe((res) => {
      res.subject?.forEach((el: any) => {
        this.studentData.push(el);
      });
      this.studentData.forEach((el) => {
        this.grades2.push({
          'Subject Name': el.subject_name.subject_name,
          score: parseInt(el.score_subject),
        });
      });
    });
    setTimeout(() => {
      this.grades = this.grades2;
    }, 200);
  }
}
