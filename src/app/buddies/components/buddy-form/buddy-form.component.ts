import {Component, OnInit, Inject} from '@angular/core';
import {Buddy} from '../../stores/buddy.store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'buddy-form',
  templateUrl: "./buddy-form.component.html",
  styleUrls: ["./buddy-form.component.scss"]
})
export class BuddyFormComponent implements OnInit {

  selectedBuddy: Buddy;
  dateAdded: any;
  constructor(public dialogRef: MatDialogRef<BuddyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      
    }

  deleteBuddy(){
    this.dialogRef.close({type: 'delete', payload: this.selectedBuddy})
  }

  saveBuddy(){
    this.dialogRef.close({type: 'save', payload: this.selectedBuddy})
  }

  close(){
    this.dialogRef.close({type: 'close'})
  }

  ngOnInit(){
    this.selectedBuddy = Object.assign({}, this.data['buddy'])
    this.dateAdded = this.selectedBuddy.dateAdded;
  }
}
