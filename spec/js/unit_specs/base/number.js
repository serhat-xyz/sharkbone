// Generated by CoffeeScript 1.5.0
(function() {

  describe('Number extensions', function() {
    var subject;
    subject = Number;
    it('should be able to addMethod', function() {
      return expect(subject.addMethod).toBeDefined();
    });
    return it('should have an errVal property', function() {
      return expect(subject.prototype.errVal).toBeDefined();
    });
  });

}).call(this);