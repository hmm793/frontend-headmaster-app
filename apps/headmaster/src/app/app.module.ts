import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';

// Module Angular Material
import { MaterialModule } from './material/material.module';

// ng2charts
import { NgChartsModule } from 'ng2-charts';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Http Client Module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Fullcalendar.io
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// Authentication and authorization
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptor } from './services/jwt.interceptor';

// Component
import { CalendarComponent } from './component/calendar/calendar.component';
import { AddScheduleComponent } from './component/add-schedule/add-schedule.component';
import { InfoComponent } from './component/info/info.component';
import { ChartdoughnutComponent } from './component/chartdoughnut/chartdoughnut.component';
import { AcademicYearComponent } from './pages/academic-year/academic-year.component';
import { AddParentComponent } from './pages/parent/add-parent/add-parent.component';
import { EditParentComponent } from './pages/parent/edit-parent/edit-parent.component';
import { AddStudentComponent } from './pages/student/add-student/add-student.component';
import { EditStudentComponent } from './pages/student/edit-student/edit-student.component';
import { EditTeacherComponent } from './pages/teacher/edit-teacher/edit-teacher.component';
import { AddTeacherComponent } from './pages/teacher/add-teacher/add-teacher.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { DetailStudentComponent } from './pages/student/detail-student/detail-student.component';
import { DetailParentComponent } from './pages/parent/detail-parent/detail-parent.component';
import { DetailTeacherComponent } from './pages/teacher/detail-teacher/detail-teacher.component';
import { DetailProfileComponent } from './pages/profile/detail-profile/detail-profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ChartbarComponent } from './component/chartbar/chartbar.component';
import { ListParentComponent } from './pages/parent/list-parent/list-parent.component';
import { ListTeacherComponent } from './pages/teacher/list-teacher/list-teacher.component';
import { ListStudentComponent } from './pages/student/list-student/list-student.component';
import { EditSubjectComponent } from './pages/edit-subject/edit-subject.component';
import { ClassComponent } from './pages/class/class.component';
import { AddClassComponent } from './pages/add-class/add-class.component';
import { ClassByScoreComponent } from './pages/class-by-score/class-by-score.component';
import { StudentByClassComponent } from './pages/student-by-class/student-by-class.component';
import { RankByClassComponent } from './pages/rank-by-class/rank-by-class.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
// Akhir Component

// Routes
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      role: 'headmaster',
    },
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'detail-profile',
        component: DetailProfileComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      { path: 'addparent', component: AddParentComponent },
      { path: 'addstudent', component: AddStudentComponent },
      { path: 'addteacher', component: AddTeacherComponent },
      { path: 'studentdetails/:idStudent', component: DetailStudentComponent },
      { path: 'studentedit/:idStudent', component: EditStudentComponent },
      { path: 'teacherdetails/:idTeacher', component: DetailTeacherComponent },
      { path: 'teacheredit/:idTeacher', component: EditTeacherComponent },
      { path: 'parentdetails/:idParent', component: DetailParentComponent },
      { path: 'parentedit/:idParent', component: EditParentComponent },
      { path: 'schedule', component: CalendarComponent },
      { path: 'student', component: ListStudentComponent },
      { path: 'teacher', component: ListTeacherComponent },
      { path: 'parent', component: ListParentComponent },
      { path: 'academicyear', component: AcademicYearComponent },
      { path: 'subject', component: SubjectComponent },
      { path: 'subject/:idSubject', component: EditSubjectComponent },
      { path: 'class', component: ClassComponent },
      { path: 'addclass', component: AddClassComponent },
      {
        path: 'not-found',
        component: NotFoundPageComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];

// Full Calendar
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    CalendarComponent,
    AddScheduleComponent,
    InfoComponent,
    ChartdoughnutComponent,
    AcademicYearComponent,
    AddParentComponent,
    EditParentComponent,
    AddStudentComponent,
    EditStudentComponent,
    EditTeacherComponent,
    AddTeacherComponent,
    SubjectComponent,
    DetailStudentComponent,
    DetailParentComponent,
    DetailTeacherComponent,
    DetailProfileComponent,
    EditProfileComponent,
    ShellComponent,
    SidenavComponent,
    DashboardComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    ForgetPasswordComponent,
    ChartbarComponent,
    ListParentComponent,
    ListTeacherComponent,
    ListStudentComponent,
    EditSubjectComponent,
    ClassComponent,
    AddClassComponent,
    ClassByScoreComponent,
    StudentByClassComponent,
    RankByClassComponent,
    SetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
