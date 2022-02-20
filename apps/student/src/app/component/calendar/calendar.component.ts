import { Component, OnInit } from '@angular/core';

// Calendar
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular'; // useful for typechecking

// Service
import { ScheduleService } from '../../services/schedule.service';

// Material
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoComponent } from '../info/info.component';

// Convert To PDF
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { LocalstorageService } from '../../services/localstorage.service';
@Component({
  selector: 'student-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  events: any[] = [];
  calendarOptions!: CalendarOptions;
  calendarVisible = true;
  idUser!: string;

  constructor(
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
    private localstorageService: LocalstorageService
  ) {}
  ngOnInit() {
    this._eventInit();

    this.calendarOptions = {
      initialView: 'timeGridWeek',
    };
  }

  // Id Student didapat dari token
  private _eventInit() {
    const token = this.localstorageService.getToken();
    const decodedToken = JSON.parse(atob(token?.split('.')[1] || ''));
    this.idUser = decodedToken.id;
    this.scheduleService.getScheduleByStudent(this.idUser).subscribe((data) => {
      this.events.push(data);
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,listWeek',
        },
        initialView: 'timeGridWeek',
        events: this.events[0],
        weekends: true,
        selectMirror: true,
        dayMaxEvents: true,
        eventClick: this.handleEventClick.bind(this),
      };
    });
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.openDialog2(clickInfo);
  }

  openDialog2(clickInfo: EventClickArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(InfoComponent, {
      data: { clickInfo },
    });
    dialogRef.afterClosed();
  }

  public convertToPDF() {
    const data = document.getElementById('schedule');
    this.generatePDF(data);
  }

  generatePDF(htmlContent: any) {
    html2canvas(htmlContent).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(contentDataURL, 'JPEG', 15, 10, 180, 160);
      pdf.save('schedule.pdf');
    });
  }
}
