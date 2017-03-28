import { Pipe, PipeTransform } from '@angular/core';

import { Buddy } from '../stores/buddy.store';

@Pipe({ name: 'buddySearch' })
export class BuddySearch implements PipeTransform {
  transform(allBuddies: Buddy[], searchText: string) {
    return allBuddies.filter(buddy =>
      (buddy.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      buddy.species.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      buddy.binomial.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    );
  }
}
