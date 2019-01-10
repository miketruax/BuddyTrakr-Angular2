// # Buddies Component
import { Component, ChangeDetectorRef } from "@angular/core";
import { Buddy } from "./models/buddy.model";
import { BuddyService } from "./services/buddy.service";
import {Subscription, Observable } from "rxjs";
import { SearchPipe } from "./pipes/search.pipe";
import { MatDialog } from "@angular/material";
import { BuddyFormComponent } from "./components/buddy-form/buddy-form.component";
import { fadeInAnimation } from "../shared/animations/fade-in-animation";
import { BuddyStoreFacade } from "./store";
import { User } from "../models/user.model";
import { RootStoreFacade } from "../store";

@Component({
  selector: "buddies",
  templateUrl: "./buddies.component.html",
  styleUrls: ["buddies.component.scss"],
  animations: [fadeInAnimation]
})
export class BuddiesComponent {
  details: boolean;
  buddies: Array<Buddy>;
  buddiesSub: Subscription;
  searchText: string = "";
  neverOut: boolean = false;
  activePage: number = 1;
  perPage: number = 12;
  user: Observable<User>

  constructor(
    private buddyService: BuddyService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private buddyStore: BuddyStoreFacade,
    private rootStore: RootStoreFacade,
    private filterBySearch: SearchPipe) 
    {
    buddyService.loadBuddies();
    this.user = rootStore.user$;
  }

  //Getters

  get inBuddies(): Buddy[] {
    return this.buddies.filter(buddy => !buddy.checkedOut);
  }

  get outBuddies(): Buddy[] {
    return this.buddies.filter(buddy => buddy.checkedOut);
  }

  get filteredBuddies() {
    return this.filterBySearch.transform(
      this.inBuddies,
      this.searchText,
      this.neverOut
    );
  }

  // Dialogue
  openDialog(buddy?: Buddy): void {
    const dialogRef = this.dialog.open(BuddyFormComponent, {
      width: "90%",
      height: "auto",
      maxWidth: "90vw",
      backdropClass: "background-accent-dark",
      data: { buddy: buddy }
    });
    dialogRef.afterClosed().subscribe((result = {}) => {
      switch (result["type"]) {
        case "delete":
          this.deleteBuddy(result["payload"]);
          break;
        case "save":
          this.saveBuddy(result["payload"]);
          break;
        default:
          break;
      }
    });
  }

  // Buddy Dialog Events
  addBuddy() {
    this.openDialog();
  }

  editBuddy(buddy: Buddy) {
    this.openDialog(buddy);
  }



  // Buddy Actions

  deleteBuddy(buddy: Buddy) {
    this.buddyService.deleteBuddy(buddy);
  }

  saveBuddy(buddy: Buddy) {
    this.buddyService.saveBuddy(buddy);
  }

  checkBuddy(buddy: Buddy) {
    buddy.checkedOut = !buddy.checkedOut;
    this.buddyService.checkBuddy(buddy);
  }

  randomBuddy() {
    //List of all buddies who are currently in
    let neverOutBuddies = this.buddies.filter(
      buddy => !buddy.checkedOut && (buddy.timesOut === 0 || !buddy.timesOut)
    );
    //selects randomly from inNeverOut unless no buddies exist then selects from inBuddies
    let randomBuddyArray =
      neverOutBuddies.length > 0 ? neverOutBuddies : this.inBuddies;
    let buddy =
      randomBuddyArray[Math.floor(Math.random() * randomBuddyArray.length)];
    this.checkBuddy(buddy);
  }

  //Search Bar
  clearFilter() {
    this.searchText = "";
    this.neverOut = false;
    this.activePage = 1;
  }

  //Pagination

  get buttons() {
    if (this.filteredBuddies.length <= this.perPage) {
      return [];
    }
    let numButtons = Math.ceil(this.filteredBuddies.length / this.perPage);
    return Array.from(Array(numButtons), (x, i) => i + 1);
  }

  get activePortion() {
    return this.filteredBuddies.slice(
      (this.activePage - 1) * this.perPage,
      this.activePage * this.perPage
    );
  }

  setActive(active: number) {
    this.activePage = active;
  }

  setPerPage(num) {
    this.perPage = num;
    this.setActive(1);
  }

  //Lifecycle Hooks
  ngOnInit() {
    this.buddiesSub = this.buddyStore
      .buddies$
      .subscribe(buddies => {
        this.buddies = buddies;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy() {
    this.buddiesSub.unsubscribe();
  }
}
