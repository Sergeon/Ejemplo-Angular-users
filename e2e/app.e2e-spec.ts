import { UsersCliPage } from './app.po';

describe('users-cli App', () => {
  let page: UsersCliPage;

  beforeEach(() => {
    page = new UsersCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
