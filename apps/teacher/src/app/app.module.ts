import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Fullcalendar.io
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboradComponent } from './pages/dashborad/dashborad.component';

// Module Angular Material
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { InfoComponent } from './calendar/info/info.component';

// Import library module

import { DetailProfilComponent } from './profil/detail-profil/detail-profil.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { AddScoreComponent } from './add-score/add-score.component';
import { HomeRoomPanelComponent } from './home-room-panel/home-room-panel.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptor } from './services/jwt.interceptor';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      role: 'teacher',
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
        component: DashboradComponent,
      },
      {
        path: 'detail-profil',
        component: DetailProfilComponent,
      },
      {
        path: 'edit-profil',
        component: EditProfilComponent,
      },
      {
        path: 'add-score/:subjectID',
        component: AddScoreComponent,
      },
      {
        path: 'home-room-panel',
        component: HomeRoomPanelComponent,
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
    DashboradComponent,
    CalendarComponent,
    InfoComponent,
    DetailProfilComponent,
    EditProfilComponent,
    AddScoreComponent,
    HomeRoomPanelComponent,
    SidenavComponent,
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
