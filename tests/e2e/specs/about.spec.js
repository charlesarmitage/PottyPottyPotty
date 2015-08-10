describe('Potty Potty Potty', function() {

  beforeEach(function() {
    browser.get('http://localhost:9000/#/app/about');
    // TODO: Maybe the storage clearance should go in a global.spec.js file?
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.waitForAngular();
  });

  describe('About Page', function(){

    it('has a title', function() {
      expect(browser.getTitle()).toEqual('PottyPottyPotty');
    });

    it('has name', function(){
      var name = element(by.css('.title'));

      expect(name.getText()).toEqual('About');
    });

    it('has credits for open source and creative commons assets', function(){
      var credits = element(by.id('credits'));

      expect(credits.getText()).toEqual('PottyPottyPotty icon derived from an icon by Freepik from www.flaticon.com. Licensed under Creative Commons by 3.0');
    });
  });
});
