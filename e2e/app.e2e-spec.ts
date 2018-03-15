import { OnetoonePage } from './app.po';

describe('onetoone App', () => {
  let page: OnetoonePage;

  beforeEach(() => {
    page = new OnetoonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
