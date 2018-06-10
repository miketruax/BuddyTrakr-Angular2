import { Pipe, PipeTransform } from '@angular/core';

import { Buddy } from '../stores/buddy.store';

@Pipe({ name: 'checkedOut' })
export class CheckedOut implements PipeTransform {
  transform(allBuddies: Buddy[]) {
    return allBuddies.filter(buddy => buddy.checkedOut);
  }
}
