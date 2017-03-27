import { Pipe, PipeTransform } from '@angular/core';

import { Buddy } from '../stores/buddy.store';

@Pipe({ name: 'buddy' })
export class BuddyFilter implements PipeTransform {
  transform(allBuddies: Buddy[], filter: string) {
    return allBuddies.filter(buddy =>
      (buddy.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
      buddy.species.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
      buddy.binomial.toLowerCase().indexOf(filter.toLowerCase()) !== -1)


    );
  }
}
