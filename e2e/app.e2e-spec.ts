import { BuddyTrakrAngular2Page } from './app.po';

describe('buddy-trakr-angular2 App', () => {
  let page: BuddyTrakrAngular2Page;

  beforeEach(() => {
    page = new BuddyTrakrAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
