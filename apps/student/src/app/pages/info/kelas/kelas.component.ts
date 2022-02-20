/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../../services/localstorage.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'student-kelas',
  templateUrl: './kelas.component.html',
  styleUrls: ['./kelas.component.css'],
})
export class KelasComponent implements OnInit {
  idUser!: string;

  constructor(
    private studentService: StudentService,
    private localstorageService: LocalstorageService
  ) {}
  classData: any;
  ngOnInit(): void {
    this._studentInit();
  }

  private _studentInit() {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.studentService.getStudentByID(this.idUser).subscribe((res) => {
      this.classData = res.kelas;
    });
  }
}
