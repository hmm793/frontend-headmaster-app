import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
// Module Angular Material
import { MaterialModule } from './material/material.module';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
////

import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

// Spinner
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';
import { DetailProfileComponent } from './pages/profile/detail-profile/detail-profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { InfoComponent } from './component/info/info.component';
import { ScoreInfoComponent } from './pages/score-info/score-info.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { DetailStudentComponent } from './pages/detail-student/detail-student.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
//
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptor } from './services/jwt.interceptor';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      role: 'parent',
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
      {
        path: 'score-info/:idStudent',
        component: ScoreInfoComponent,
      },
      {
        path: 'detail-student/:idStudent',
        component: DetailStudentComponent,
      },
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
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    DetailProfileComponent,
    EditProfileComponent,
    CalendarComponent,
    InfoComponent,
    ScoreInfoComponent,
    SidenavComponent,
    DetailStudentComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
