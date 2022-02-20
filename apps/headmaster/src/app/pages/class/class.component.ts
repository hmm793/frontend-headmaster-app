import { Component, OnInit } from '@angular/core';
import { kelas } from '../../models/kelas';
import { Student } from '../../models/student';
import { KelasServices } from '../../services/kelas.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'headmaster-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {
  constructor(
    private kelasService: KelasServices,
    private studentService: StudentService
  ) {}
  kelas?: kelas[];
  student: Student[] = [];

  ngOnInit(): void {
    this.kelasService.getAllClass().subscribe((result) => {
      this.kelas = result;
      console.log('HASIL : ', this.kelas);
    });
  }
}
