import {Component, OnInit, Inject} from '@angular/core';
import {Buddy} from '../../models/buddy.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'buddy-form',
  templateUrl: "./buddy-form.component.html",
  styleUrls: ["./buddy-form.component.scss"]
})
export class BuddyFormComponent implements OnInit {

  selectedBuddy: Buddy;
  buddyForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<BuddyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public fb: FormBuilder) {
      
    }

  deleteBuddy(){
    this.dialogRef.close({type: 'delete', payload: this.selectedBuddy})
  }

  saveBuddy(){
    if(this.buddyForm.valid){
      this.dialogRef.close({type: 'save', payload: this.selectedBuddy})
    }
  }

  close(){
    this.dialogRef.close({type: 'close'})
  }

  get name(){
    return this.buddyForm.get('name')
  }

  get species(){
    return this.buddyForm.get('species')
  }

  get binomial(){
    return this.buddyForm.get('binomial')
  }

  get dateAdded(){
    return this.buddyForm.get('dateAdded')
  }

  get description(){
    return this.buddyForm.get('description')
  }

  ngOnInit(){
    this.selectedBuddy = Object.assign({}, this.data['buddy'])
      this.buddyForm = this.fb.group({
        name: [this.selectedBuddy.name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(128)])],
        species: [this.selectedBuddy.species, Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(3)])],
        binomial: [this.selectedBuddy.binomial], 
        dateAdded: [this.selectedBuddy.dateAdded],
        description: [this.selectedBuddy.description, Validators.compose([Validators.maxLength(256)])]
      });
      };
}
