import { SalamFriendsPage } from './app.po';

describe('salam-friends App', () => {
  let page: SalamFriendsPage;

  beforeEach(() => {
    page = new SalamFriendsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
