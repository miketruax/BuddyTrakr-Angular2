
import { FormsModule } from '@angular/forms';
import {BuddiesComponent} from "./components/main/buddies.component";
import {BuddyFormComponent} from './components/buddy-form/buddy-form.component'
import {HttpClientModule} from "@angular/common/http";
import {BuddyService} from './services/buddy.service';
import { NgModule } from '@angular/core';
import {SearchPipe} from './pipes/search.pipe';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { BuddyCardComponent } from './components/buddy-card/buddy-card.component';
import { MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [
    BuddiesComponent, BuddyFormComponent, BuddyCardComponent
  ],
  imports: [CommonModule,
    FormsModule, MaterialModule,
    HttpClientModule
  ],
  providers: [BuddyService, SearchPipe],
  bootstrap: [BuddiesComponent], 
  entryComponents: [BuddyFormComponent],
  exports: [BuddiesComponent, BuddyFormComponent, BuddyCardComponent]
})

export class BuddiesModule { }
