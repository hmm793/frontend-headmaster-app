/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { LocalstorageService } from '../../services/localstorage.service';
import { ParentService } from '../../services/parent.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'parent-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css'],
})
export class DetailStudentComponent implements OnInit {
  studentData: Student = {
    _id: '',
    first_name: '',
    last_name: '',
    gender: '',
    father_name: '',
    mother_name: '',
    date_of_birth: '',
    father_occupation: '',
    blood_group: '',
    religion: '',
    email: '',
    year_academic: '',
    addmission_date: '',

    kelas: {
      _id: '',
      class_name: '',
      teacher: {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        short_bio: '',
      },
      subject: [
        {
          _id: '',
          subject_name: '',
          teacher_id: {
            _id: '',
            first_name: '',
            last_name: '',
            email: '',
            short_bio: '',
            id: '',
          },
          duration: '',
          id: '',
        },
      ],
    },
    address: '',
    phone: '',
    short_bio: '',
    image: '',
    role: '',
    status: '',
    subject: [
      {
        subject_name: {
          _id: '',
          subject_name: '',
          teacher_id: '',
          duration: '',
          id: '',
        },
        score_subject: '',
      },
    ],
  };

  idStudent!: string;
  idUser?: string;
  children: any[] = [];
  children2?: any[];
  constructor(
    private studentService: StudentService,
    private parentService: ParentService,
    private route: ActivatedRoute,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['idStudent'];
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
  private _studentInit(id: string) {
    this.studentService.getStudentByID(id).subscribe((res) => {
      this.studentData = res;
    });
  }
}
