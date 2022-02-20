/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { LocalstorageService } from '../../services/localstorage.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'teacher-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrls: ['./detail-profil.component.css'],
})
export class DetailProfilComponent implements OnInit {
  idUser?: string;

  constructor(
    private teacherService: TeacherService,
    private localstorageService: LocalstorageService
  ) {}
  teacherData: Teacher = {
    _id: '',
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    blood_group: '',
    religion: '',
    addmission_date: '',
    email: '',
    address: '',
    phone: '',
    short_bio: '',
    image: '',
    role: '',
    kelas: {
      _id: '',
      class_name: '',
    },
    Subject: [
      {
        subject_name: '',
      },
    ],
  };
  ngOnInit(): void {
    this._teacherInit();
  }

  private _teacherInit() {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.teacherService.getTeacherByID(this.idUser).subscribe((res) => {
      this.teacherData = res;
    });
  }

  Submit() {}
}
