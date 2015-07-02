describe('Potty Potty Potty', function() {
  var pottyTrips = element.all(by.repeater('trip in pottyTrips'));
  var saveTripButton;
  var isWeeButton;
  var isPooButton;

  beforeEach(function() {
    browser.get('http://localhost:9000/#/app/home');
    browser.waitForAngular();
    var addTripButton = element(by.id('add-trip'));
    addTripButton.click();
    saveTripButton = element(by.id('save-trip'));
    isWeeButton = element(by.id('is-wee'));
    isPooButton = element(by.id('is-poo'));
  });

  describe('Add Page', function(){

    it('has a title', function() {
      var title = element(by.id('title'));
      expect(title.getText()).toEqual('Add Potty Trip');
    });

    it('initially does not have save button', function(){
      expect(saveTripButton.isDisplayed()).toBeFalsy();
    });

    it('has save button only when wee or poo is ticked', function(){
      isWeeButton.click();
      expect(saveTripButton.isDisplayed()).toBeTruthy();
      isWeeButton.click();
      expect(saveTripButton.isDisplayed()).toBeFalsy();
      isPooButton.click();
      expect(saveTripButton.isDisplayed()).toBeTruthy();
      isPooButton.click();
      expect(saveTripButton.isDisplayed()).toBeFalsy();
      isWeeButton.click();
      isPooButton.click();
      expect(saveTripButton.isDisplayed()).toBeTruthy();
    });

    it('clicking save button adds trip', function(){
      isWeeButton.click();
      saveTripButton.click();

      expect(pottyTrips.count()).toEqual(1);
    });

    it('clicking save button displays home page', function(){
      isWeeButton.click();
      saveTripButton.click();

      expect(browser.getLocationAbsUrl()).toEqual('/app/home');
    });
  });

});