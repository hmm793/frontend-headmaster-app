/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as moment from 'moment';
import { kelas } from '../../models/kelas';
import { KelasServices } from '../../services/kelas.service';
import { ScheduleService } from '../../services/schedule.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'headmaster-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
})
export class AddScheduleComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  form!: FormGroup;
  selectedValue?: string;
  day?: string;
  kelas: kelas[] = [];
  subject: any[] = [];
  kelasValue?: string;
  kelasIdValue?: string;
  subjectValue!: string;
  endValue = 'test';
  dayValue = [
    { day: 'Monday', value: 1 },
    { day: 'Tuesday', value: 2 },
    { day: 'Wednesday', value: 3 },
    { day: 'Thursday', value: 4 },
    { day: 'Friday', value: 5 },
  ];
  dayValueNumber?: number;
  startTimeValue?: string;
  endTimeValue?: string;
  duration = 0;
  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private kelasService: KelasServices,
    private subjectService: SubjectService,
    private dialogRef: MatDialogRef<AddScheduleComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._formInit();
    this._kelasInit();
    this._subjectInit();
  }

  private _formInit() {
    this.form = this.fb.group({
      // Untuk Add Event dan Add Class
      title: new FormControl(''),
      color: new FormControl(''),
      // Untuk Add Event
      allDay: new FormControl(),
      // all day
      start2: new FormControl(moment().format('yyyy-MM-DD')),
      // not all day
      start: new FormControl(moment().format('yyyy-MM-DDTHH:mm')),
      end: new FormControl(moment().format('yyyy-MM-DDTHH:mm')),

      // Untuk Add Class
      startTime: new FormControl(moment().format('HH:mm')),
      endTime: new FormControl(moment().format('HH:mm')),
      daysOfWeek: new FormControl(),
      kelas: new FormControl(''),
    });
  }

  _durationOto(subjectName: string) {
    let hasil: number;
    this.subject.forEach((element) => {
      if (element.subject_name == subjectName) {
        if (typeof element.duration == 'string') {
          hasil = parseInt(element.duration);
        } else {
          hasil = element.duration;
        }
      }
      this.duration = hasil; // dalam menit
    });
  }

  _calcEndTime(startTime: string, duration: number) {
    const tt = startTime.split(':');
    const sec = parseInt(tt[0]) * 3600 + parseInt(tt[1]) * 60;
    const durationInSecond = duration * 60;
    this.endTimeValue = new Date((sec + durationInSecond) * 1000)
      .toISOString()
      .substr(11, 8);
  }

  _relatedClass(subjectName: any) {
    this.kelas.forEach((el) => {
      el.subject.forEach((subj: any) => {
        if (subj.subject_name == subjectName) {
          this.kelasValue = el.class_name;
          this.kelasIdValue = el._id;
        }
      });
    });
  }
  private _kelasInit() {
    this.kelasService.getAllClass().subscribe(
      (kelas) => {
        kelas.forEach((element: any) => {
          this.kelas.push(element);
        });
      },
      () => {},
      () => {}
    );
  }
  private _subjectInit() {
    this.subjectService.getAllSubjects().subscribe(
      (subject) => {
        subject.forEach((element: any) => {
          this.subject.push(element);
        });
      },
      () => {},
      () => {}
    );
  }

  // Add Event
  save() {
    if (this.selectedValue === 'true') {
      const endDate = new Date(this.form?.value.start2);
      const newEndDate1 = new Date(endDate.getTime() + 86400000);
      const newData_2 = {
        title: this.form?.value.title,
        start: this.form?.value.start2,
        end: newEndDate1,
        color: this.form?.value.color,
        allDay: this.form?.value.allDay,
      };
      this.scheduleService.createSchedule(newData_2).subscribe((res: any) => {
        if (res.error) {
          // this.toastr.success(res.error);
          this._snackBar.open(res.error, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          // this.toastr.success('Jadwal Berhasil Dibuat');
          this._snackBar.open('Jadwal Berhasil Dibuat', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          window.location.reload();
        }
      });
      this.dialogRef.close();
    } else {
      const newData_1 = {
        title: this.form?.value.title,
        start: this.form?.value.start,
        end: this.form?.value.end,
        color: this.form?.value.color,
        allDay: this.form?.value.allDay,
      };
      this.scheduleService.createSchedule(newData_1).subscribe((res: any) => {
        if (res.error) {
          // this.toastr.success(res.error);
          this._snackBar.open(res.error, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          // this.toastr.success('Jadwal Berhasil Dibuat');
          this._snackBar.open('Jadwal Berhasil Dibuat', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          window.location.reload();
        }
      });
      this.dialogRef.close();
    }
  }

  // Add Schedule
  save2() {
    const newData = {
      title: this.form?.value.title,
      kelas: this.kelasIdValue,
      daysOfWeek: [this.dayValueNumber],
      startTime: this.form?.value.startTime,
      endTime: this.endTimeValue,
      color: this.form?.value.color,
      allDay: false,
    };
    this.scheduleService.createSchedule(newData).subscribe((res: any) => {
      if (res.error) {
        // this.toastr.success(res.error);
        this._snackBar.open(res.error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        // this.toastr.success('Jadwal Berhasil Dibuat');
        this._snackBar.open('Jadwal Berhasil Dibuat', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        window.location.reload();
      }
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
