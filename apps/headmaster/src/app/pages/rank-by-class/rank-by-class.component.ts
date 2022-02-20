/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
interface rankStudent {
  _id?: string;
  first_name?: string;
  last_name?: string;
  totalScore?: string;
  id?: string;
}
@Component({
  selector: 'headmaster-rank-by-class',
  templateUrl: './rank-by-class.component.html',
  styleUrls: ['./rank-by-class.component.css'],
})
export class RankByClassComponent implements OnInit {
  @Input() public parentData: string;
  studentData?: rankStudent[];
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService
      .getAllStudentByRankByClass(this.parentData)
      .subscribe((res) => {
        this.studentData = res;
      });
  }
}
