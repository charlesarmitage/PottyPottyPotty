describe('Potty Potty Potty', function() {
  var pottyTrips = element.all(by.repeater('trip in pottyTrips'));

  beforeEach(function() {
    browser.get('http://localhost:9000/#/app/home');
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
  });

});
