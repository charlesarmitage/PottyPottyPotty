describe('Potty Potty Potty', function() {
  var pottyTrips = element.all(by.repeater('trip in pottyTrips'));
  var saveTripButton;
  var isWeeButton;
  var isPooButton;

  beforeEach(function() {
    browser.get('http://localhost:9000/#/app/home');
    // TODO: Maybe the storage clearance should go in a global.spec.js file?
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.waitForAngular();
    var addTripButton = element(by.id('add-trip'));
    addTripButton.click();
    saveTripButton = element(by.id('save-trip'));
    isWeeButton = element(by.id('is-wee'));
    isPooButton = element(by.id('is-poo'));

    isWeeButton.click();
    saveTripButton.click();
  });

  describe('Deleting trip', function(){

    it('has list with one trip', function() {
        expect(pottyTrips.count()).toEqual(1);
    });

    // Currently protractor has a bug around selecting alerts. Back to manual testing for now.
    describe('clicking cross', function(){

      xit('shows dialog', function(){

        var deleteButton = pottyTrips.get(0).element(by.tagName('a'));
        deleteButton.click();

        browser.sleep(1000);
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);

        var deleteAlert = browser.switchTo().alert();
        expect(deleteAlert.getText()).toEqual("Delete Trip ?");
      });
    });
 });   
});
