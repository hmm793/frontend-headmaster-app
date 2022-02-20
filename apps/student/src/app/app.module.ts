import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';

// Module Angular Material
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ScoreComponent } from './pages/info/score/score.component';
import { KelasComponent } from './pages/info/kelas/kelas.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { DetailProfileComponent } from './pages/profile/detail-profile/detail-profile.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { InfoComponent } from './component/info/info.component';

//////////////////////////////////////////////////////////////
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

// Route
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptor } from './services/jwt.interceptor';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      role: 'student',
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
        path: 'class-info',
        component: KelasComponent,
      },
      {
        path: 'grade-info',
        component: ScoreComponent,
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
    DashboardComponent,
    ScoreComponent,
    KelasComponent,
    EditProfileComponent,
    DetailProfileComponent,
    CalendarComponent,
    InfoComponent,
    ShellComponent,
    SidebarComponent,
    SidenavComponent,
    ForgetPasswordComponent,
    LoginPageComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    BrowserAnimationsModule,
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
