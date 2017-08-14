import { browser, by, element } from 'protractor';

export class DesignHubPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dh-root h1')).getText();
  }
}
