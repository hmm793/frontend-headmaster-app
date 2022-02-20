import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { KelasServices } from '../../services/kelas.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'headmaster-student-by-class',
  templateUrl: './student-by-class.component.html',
  styleUrls: ['./student-by-class.component.css'],
})
export class StudentByClassComponent implements OnInit {
  @Input() public parentData: any;
  student: Student[] = [];
  class_name?: string;
  constructor(
    private studentService: StudentService,
    private kelasService: KelasServices
  ) {}
  ngOnInit(): void {
    // console.log('related to the class:',);
    this.kelasService.getAllClass().subscribe((res) => {
      res.forEach((el) => {
        if (el._id.toString() == this.parentData) {
          this.class_name = el.class_name;
        }
      });
    });
    this.studentService
      .getAllStudentRelatedToTheClass(this.parentData)
      .subscribe((result) => {
        this.student = result;
      });
  }
}
