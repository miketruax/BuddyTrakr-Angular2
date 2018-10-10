import { Pipe, PipeTransform } from '@angular/core';

import { Buddy } from '../stores/buddy.store';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(allBuddies: Buddy[], searchText: string, neverOut: boolean) {
    let filteredBuddies: Buddy[] = allBuddies.filter(buddy =>
      (buddy.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      buddy.species.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      buddy.binomial.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
      );
    return neverOut ? 
        filteredBuddies.filter(buddy => buddy.timesOut === 0 || buddy.checkedOut) : filteredBuddies
  }
}
