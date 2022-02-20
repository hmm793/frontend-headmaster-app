import { Component, OnInit } from '@angular/core';
import { kelas } from '../../../models/kelas';
import { Student } from '../../../models/student';
import { KelasServices } from '../../../services/kelas.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'headmaster-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private kelasService: KelasServices
  ) {}
  allStudent: Student[] = [];
  kelas: kelas[] = [];
  panelOpenState = true;

  ngOnInit(): void {
    this.studentService.getAllStudent().subscribe((allResult) => {
      this.allStudent = allResult;
      console.log('all student:', this.allStudent);
    });

    this.kelasService.getAllClass().subscribe((result) => {
      this.kelas = result;
      console.log('kelas:', this.kelas);
    });
  }
}
