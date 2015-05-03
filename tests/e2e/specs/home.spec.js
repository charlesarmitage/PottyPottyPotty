describe('Potty Potty Potty', function() {
  var statistics = element.all(by.repeater('statistic in statistics'));

  beforeEach(function() {
    browser.get('http://localhost:9000/#/app/home');
  });

  describe('Home Page', function(){
    
    it('has a title', function() {
      expect(browser.getTitle()).toEqual('PottyPottyPotty');
    });
  });

});
