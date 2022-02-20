import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../models/teacher';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'headmaster-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css'],
})
export class ListTeacherComponent implements OnInit {
  constructor(private teacherService: TeacherService) {}
  teachers: Teacher[] = [];
  ngOnInit(): void {
    this.teacherService.getAllTeacher().subscribe((result) => {
      this.teachers = result;
    });
  }
}
