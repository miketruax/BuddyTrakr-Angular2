import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatListModule,
  MatPaginatorModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDialogModule,

} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    MatPaginatorModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatPaginatorModule,
  ]
})
export class MaterialModule {}