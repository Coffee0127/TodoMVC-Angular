import { TodoMVCAngularPage } from './app.po';

describe('todo-mvc-angular App', function() {
  let page: TodoMVCAngularPage;

  beforeEach(() => {
    page = new TodoMVCAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
