
import { FormsModule } from '@angular/forms';
import {BuddiesComponent} from "./buddies.component";
import {BuddyFormComponent} from './components/buddy-form/buddy-form.component'
import {HttpClientModule} from "@angular/common/http";
import {BuddyService} from './services/buddy.service';
import { NgModule } from '@angular/core';
import {SearchPipe} from './pipes/search.pipe';
import { CommonModule } from '@angular/common';
import { BuddyCardComponent } from './components/buddy-card/buddy-card.component';
import { BuddiesRoutingModule } from './buddies-routing.module';
import {MaterialModule} from '../material.module';
import { StoreModule } from '@ngrx/store';
import {reducers} from './store/reducers';


@NgModule({
  declarations: [
    BuddiesComponent, BuddyFormComponent, BuddyCardComponent
  ],
  imports: [CommonModule, BuddiesRoutingModule, MaterialModule, 
    FormsModule, StoreModule.forFeature('buddies', reducers),
    HttpClientModule
  ],
  providers: [BuddyService, SearchPipe],
  bootstrap: [BuddiesComponent], 
  entryComponents: [BuddyFormComponent],
  exports: [BuddiesComponent, BuddyFormComponent, BuddyCardComponent]
})

export class BuddiesModule { }
