/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'parent-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // public message: any[] = [];
  /*
   { message: '61dd8158e5bb45a1d64602b6' },
   { message: '61dda56339244bc979839666' },
  */
  childData?: any[];
  allData: any[] = [];
  idUser?: string;
  constructor(
    private parentService: ParentService,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.parentService.getParentById(this.idUser).subscribe((el) => {
      this.childData = el.child;
    });
  }
}
