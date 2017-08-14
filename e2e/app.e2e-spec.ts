import { DesignHubPage } from './app.po';

describe('design-hub App', () => {
  let page: DesignHubPage;

  beforeEach(() => {
    page = new DesignHubPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to dh!');
  });
});
