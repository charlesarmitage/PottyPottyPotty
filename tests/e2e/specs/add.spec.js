describe('Potty Potty Potty', function() {
  var pottyTrips = element.all(by.repeater('trip in pottyTrips'));
  var saveTripButton;
  var isWeeButton;

  beforeEach(function() {
    browser.get('http://localhost:9000/#/app/home');
    browser.waitForAngular();
    var addTripButton = element(by.id('add-trip'));
    addTripButton.click();
    saveTripButton = element(by.id('save-trip'));
    isWeeButton = element(by.id('is-wee'));
  });

  describe('Add Page', function(){

    it('has a title', function() {
      var title = element(by.id('title'));
      expect(title.getText()).toEqual('Add Potty Trip');
    });

    // it('has save button when wee or poo is ticked', function(){
    // it('initially does not have save button', function(){

    it('has save button', function(){
      expect(saveTripButton.isDisplayed()).toBeTruthy();
    });

    it('clicking save button adds trip', function(){
      isWeeButton.click();
      saveTripButton.click();

      expect(pottyTrips.count()).toEqual(1);
    });

    it('clicking save button displays home page', function(){
      saveTripButton.click();

      expect(browser.getLocationAbsUrl()).toEqual('/app/home');
    });
  });

});
