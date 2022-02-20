/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'teacher-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  opened = false;
  showProfile = false;
  showInfo = false;
  showProfile2 = false;
  showProfile3 = false;
  idUser?: string;

  constructor(
    private teacherService: TeacherService,
    private localstorageService: LocalstorageService,
    private authorizationService: AuthorizationService
  ) {}
  subject?: any[] = [
    {
      _id: '',
      subject_name: '',
      teacher_id: '',
      duration: '',
    },
  ];
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
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
  logoutUser() {
    this.authorizationService.logout();
  }
}
