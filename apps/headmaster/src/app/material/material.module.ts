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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatCheckboxModule,
  MatGridListModule,
  MatToolbarModule,
  MatCardModule,
  MatSnackBarModule,
  MatTableModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatSortModule,
  MatChipsModule,
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
