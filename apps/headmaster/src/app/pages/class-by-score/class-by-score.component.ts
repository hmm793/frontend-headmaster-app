/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';

// TABLE
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'headmaster-class-by-score',
  templateUrl: './class-by-score.component.html',
  styleUrls: ['./class-by-score.component.css'],
})
export class ClassByScoreComponent implements OnInit {
  @Input() public parentData: any;
  student: any[] = [];
  dataSource: MatTableDataSource<any>;
  posts: any[] = [];
  columns: string[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService
      .getAllStudentRelatedToTheClass(this.parentData)
      .subscribe((result) => {
        this.student = result;
        console.log(this.student[0]);
        this.columns.push('id');
        this.columns.push('nama');
        this.student[0].subject.forEach((element) => {
          this.columns.push(element.subject_name.subject_name);
        });
        this.student.forEach((el) => {
          const testData = {};
          testData['id'] = el._id;
          testData['nama'] = el.first_name + ' ' + el.last_name;
          el.subject.forEach((element) => {
            const tempData = {};
            for (const [key, value] of Object.entries(element)) {
              if (key == 'subject_name') {
                tempData['subject_name'] = value['subject_name'];
              } else if (key == 'score_subject') {
                tempData['score_subject'] = value;
              }
            }
            testData[`${tempData['subject_name']}`] = tempData['score_subject'];
          });
          this.posts.push(testData);
        });
        this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      });
  }
}
