/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { KelasService } from '../services/kelas.service';
import { LocalstorageService } from '../services/localstorage.service';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'teacher-home-room-panel',
  templateUrl: './home-room-panel.component.html',
  styleUrls: ['./home-room-panel.component.css'],
})
export class HomeRoomPanelComponent implements OnInit {
  ///
  students!: Student[];
  subjectList!: any;
  namaKelas!: string;
  idUser?: string;
  teacherData!: any;
  constructor(
    private studentService: StudentService,
    private kelasService: KelasService,
    private teacherService: TeacherService,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;

    this.teacherService.getTeacherByID(this.idUser).subscribe((res) => {
      this.teacherData = res;
      console.log(
        'this.teacherData.kelas._id.toString()',
        this.teacherData.kelas._id.toString()
      );

      this.studentService
        .getAllStudentByClass(this.teacherData.kelas._id.toString())
        .subscribe((res) => {
          this.students = res;
          this.subjectList = this.students[0].subject?.map((el) => {
            return el.subject_name?.subject_name;
          });

          console.log('SUBEJCYT LIST : ', this.students[0]);
        });

      this.kelasService.getAllClass().subscribe((res) => {
        console.log('RES', res);
        res.forEach((el) => {
          if (el._id.toString() == this.teacherData.kelas._id.toString()) {
            console.log('ETE');
            this.namaKelas = el.class_name;
            console.log(el.class_name);
          }
        });
      });
    });
  }
}
