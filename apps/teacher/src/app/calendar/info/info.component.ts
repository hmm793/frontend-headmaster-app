/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScheduleService } from '../../services/schedule.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectService } from '../../services/subject.service';
@Component({
  selector: 'teacher-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  info?: any = {};
  subject?: any;
  today: number = Date.now();
  constructor(
    private subjectService: SubjectService,
    private scheduleService: ScheduleService,
    private dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._getDataSchedule();
  }

  close() {
    this.dialogRef.close();
  }

  private _getDataSchedule() {
    this.scheduleService
      .getScheduleByID(this.data.clickInfo.event.id)
      .subscribe((schedule) => {
        this.info = schedule;
        if (this.info.startTime) {
          const tt = this.info.startTime.split(':');
          const sec = tt[0] * 3600 + tt[1] * 60;
          this.info.startTime = new Date(sec * 1000)
            .toISOString()
            .substr(11, 5);
        }
        if (this.info.endTime) {
          const tt = this.info.endTime.split(':');
          const sec = tt[0] * 3600 + tt[1] * 60;
          this.info.endTime = new Date(sec * 1000).toISOString().substr(11, 5);
        }
        this.subjectService.getAllSubject().subscribe((res) => {
          res.forEach((el) => {
            if (el.subject_name == this.info.title) {
              this.subject = el;
            }
          });
        });
      });
  }
}
