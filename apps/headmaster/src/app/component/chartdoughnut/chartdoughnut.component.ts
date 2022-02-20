/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'headmaster-chartdoughnut',
  templateUrl: './chartdoughnut.component.html',
  styleUrls: ['./chartdoughnut.component.css'],
})
export class ChartdoughnutComponent implements OnInit {
  maleStudent = 0;
  femaleStudent = 0;

  public doughnutChartLabels: string[] = ['Female Student', 'Male Student'];

  public doughnutChartData?: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: any[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: any[];
  }): void {}

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this._maleStudentInit();
    this._femaleStudentInit();

    setTimeout(() => {
      this.doughnutChartData = {
        labels: this.doughnutChartLabels,
        datasets: [{ data: [this.femaleStudent, this.maleStudent] }],
      };
    }, 2000);
  }

  private _maleStudentInit() {
    this.studentService.getMaleStudent().subscribe((result) => {
      this.maleStudent = result.totalMaleStudent;
      console.log(this.maleStudent);
    });
  }

  private _femaleStudentInit() {
    this.studentService.getFemaleStudent().subscribe((result) => {
      this.femaleStudent = result.totalFemaleStudent;
      console.log(this.femaleStudent);
    });
  }
}
