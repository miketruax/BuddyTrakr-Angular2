import { Pipe, PipeTransform } from '@angular/core';

import { Buddy } from '../stores/buddy.store';

@Pipe({ name: 'checkedIn' })
export class CheckedIn implements PipeTransform {
  transform(allBuddies: Buddy[]) {
    return allBuddies.filter(buddy => !buddy.checkedOut);
  }
}
