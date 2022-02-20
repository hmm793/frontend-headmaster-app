import { NgModule } from '@angular/core';

// Button Module
import { MatButtonModule } from '@angular/material/button';

// Icon Module
import { MatIconModule } from '@angular/material/icon';

// Dialog Module
import { MatDialogModule } from '@angular/material/dialog';

// Form Field Module
import { MatFormFieldModule } from '@angular/material/form-field';

//Sidenav
import { MatSidenavModule } from '@angular/material/sidenav';

// List
import { MatListModule } from '@angular/material/list';

// Input
import { MatInputModule } from '@angular/material/input';

// Select
import { MatSelectModule } from '@angular/material/select';

// Tab
import { MatTabsModule } from '@angular/material/tabs';

// Checkbox
import { MatCheckboxModule } from '@angular/material/checkbox';

// Snack Bar
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Table
import { MatTableModule } from '@angular/material/table';

// Card
import { MatCardModule } from '@angular/material/card';

//tool
import { MatToolbarModule } from '@angular/material/toolbar';

// Datepicker
import { MatDatepickerModule } from '@angular/material/datepicker';

// Array
const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTableModule,
  MatCardModule,
  MatToolbarModule,
  MatDatepickerModule,
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
