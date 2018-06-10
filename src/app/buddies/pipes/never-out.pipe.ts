import { Pipe, PipeTransform } from '@angular/core';
import { Buddy } from '../stores/buddy.store';


@Pipe({ name: 'neverOut' })
export class NeverOut implements PipeTransform {
  transform(allBuddies: Buddy[], neverOut: boolean) {
    if(neverOut) {
      return allBuddies.filter(buddy =>
        (buddy.timesOut === 0 || buddy.checkedOut)
      );
    }
    else{
      return allBuddies
    }
  }
}
