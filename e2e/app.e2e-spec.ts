import { CapstoneHubPage } from './app.po';

describe('capstone-hub App', () => {
  let page: CapstoneHubPage;

  beforeEach(() => {
    page = new CapstoneHubPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
