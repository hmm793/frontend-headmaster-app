import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'parent-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  opened = false;
  showProfile = false;
  showInfo = false;
  showProfile2 = false;
  showProfile3 = false;
  parentData!: any;
  idUser?: string;
  constructor(
    private parentService: ParentService,
    private localstorageService: LocalstorageService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.parentService.getParentById(this.idUser).subscribe((el) => {
      this.parentData = el;
    });
  }
  logoutUser() {
    this.authorizationService.logout();
  }
}
