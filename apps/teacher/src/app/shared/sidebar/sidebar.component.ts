/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { TeacherService } from '../../services/teacher.service';
@Component({
  selector: 'teacher-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  showProfile = false;
  showProfile2 = false;
  showProfile3 = false;
  idUser?: string;

  constructor(
    private teacherService: TeacherService,
    private localstorageService: LocalstorageService
  ) {}
  subject?: any[] = [
    {
      _id: '',
      subject_name: '',
      teacher_id: '',
      duration: '',
    },
  ];
  ngOnInit(): void {
    this._teacherInit();
  }
  private _teacherInit() {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.teacherService.getTeacherByID(this.idUser).subscribe((res) => {
      this.subject = res.Subject;
      console.log('HASIL : ', this.subject);
    });
  }

  goToLink(idSubject: any) {
    window.location.href = `/add-score/${idSubject}`;
  }
}
