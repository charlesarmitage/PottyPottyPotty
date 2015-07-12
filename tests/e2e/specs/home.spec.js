describe('Potty Potty Potty', function() {
  var pottyTrips = element.all(by.repeater('trip in pottyTrips'));

  beforeEach(function() {
    browser.get('http://localhost:9000/#/app/home');
    // TODO: Maybe the storage clearance should go in a global.spec.js file?
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.waitForAngular();
  });

  describe('Home Page', function(){

    it('has a title', function() {
      expect(browser.getTitle()).toEqual('PottyPottyPotty');
    });

    it('has visible hint text when potty trip list is empty', function(){
      var hintText = element(by.id('hint-text'));

      expect(pottyTrips.count()).toEqual(0);
      expect(hintText.isDisplayed()).toBeTruthy();
      expect(hintText.getText()).toEqual('Welcome! Would you like to add a potty trip?');
    });

    it('has hidden potty trip list when potty trip list is empty', function(){
      var triplist = element(by.id('potty-trips'));

      expect(pottyTrips.count()).toEqual(0);
      expect(triplist.isDisplayed()).toBeFalsy();
    });

    it('clicking add button displays add page', function(){
      var addTripButton = element(by.id('add-trip'));
      addTripButton.click();

      expect(browser.getLocationAbsUrl()).toEqual('/app/add');
    });
  });

});
