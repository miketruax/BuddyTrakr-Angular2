
import { FormsModule } from '@angular/forms';
import {BuddiesComponent} from "./components/main/buddies.component";
import {BuddyListComponent} from './components/buddy-list/buddy-list.component'
import {BuddyDetailsComponent} from './components/buddy-details/buddy-details.component'
import {HttpClientModule} from "@angular/common/http";
import {BuddyService} from './services/buddy.service';
import { NgModule } from '@angular/core';
import {CheckedIn} from './pipes/checked-in.pipe';
import {CheckedOut} from './pipes/checked-out.pipe';
import {BuddySearch} from './pipes/buddy-search.pipe';
import {NeverOut} from './pipes/never-out.pipe';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    BuddiesComponent, BuddyDetailsComponent, BuddyListComponent,
    CheckedIn, CheckedOut, BuddySearch, NeverOut
  ],
  imports: [CommonModule,
    FormsModule, MaterialModule,
    HttpClientModule
  ],
  providers: [BuddyService],
  bootstrap: [BuddiesComponent], 
  exports: [BuddiesComponent, BuddyDetailsComponent, BuddyListComponent, CheckedIn, CheckedOut, BuddySearch, NeverOut]
})

export class BuddiesModule { }
