// Generated by CoffeeScript 1.5.0
(function() {

  describe('Sharkbone.ClassModules.Relational', function() {
    var subject;
    subject = Sharkbone.ClassModules.Relational;
    beforeEach(function() {
      subject.appNamespace = jasmine.createSpy('appNamespace').andReturn('Sharkbone.App.');
      return subject.prototype = {};
    });
    it('should be defined', function() {
      return expect(subject).toBeDefined();
    });
    describe('hasMany', function() {
      it('should be defined', function() {
        return expect(subject.hasMany).toBeDefined();
      });
      it('should raise an exception when called without a key', function() {
        return expect(subject.hasMany).toThrow();
      });
      describe('sons collection', function() {
        beforeEach(function() {
          subject.prototype.relations = null;
          return subject.hasMany.call(subject, 'sons');
        });
        it('should add a key to prototype.relation', function() {
          return expect(subject.prototype.relations.length).toEqual(1);
        });
        return it('should match the expected relation object', function() {
          return expect(subject.prototype.relations[0]).toEqual({
            type: Backbone.HasMany,
            key: 'sons',
            relatedModel: 'Sharkbone.App.Models.Son',
            collectionType: 'Sharkbone.App.Collections.Sons'
          });
        });
      });
      return describe('children collection', function() {
        beforeEach(function() {
          subject.prototype.relations = null;
          return subject.hasMany.call(subject, 'children', {
            collectionType: 'Sharkbone.App.Collections.Children'
          });
        });
        it('should add a key to prototype.relation', function() {
          return expect(subject.prototype.relations.length).toEqual(1);
        });
        return it('should match the expected relation object', function() {
          return expect(subject.prototype.relations[0]).toEqual({
            type: Backbone.HasMany,
            key: 'children',
            relatedModel: 'Sharkbone.App.Models.Child',
            collectionType: 'Sharkbone.App.Collections.Children'
          });
        });
      });
    });
    return describe('hasOne', function() {
      it('should be defined', function() {
        return expect(subject.hasOne).toBeDefined();
      });
      it('should raise an exception when called without a key', function() {
        return expect(subject.hasOne).toThrow();
      });
      describe('related possession', function() {
        beforeEach(function() {
          subject.prototype.relations = null;
          return subject.hasOne.call(subject, 'possession');
        });
        it('should add a key to prototype.relation', function() {
          return expect(subject.prototype.relations.length).toEqual(1);
        });
        return it('should match the expected relation object', function() {
          return expect(subject.prototype.relations[0]).toEqual({
            type: Backbone.HasOne,
            key: 'possession',
            relatedModel: 'Sharkbone.App.Models.Possession'
          });
        });
      });
      return describe('related task', function() {
        beforeEach(function() {
          subject.prototype.relations = null;
          return subject.hasOne.call(subject, 'task', {
            relatedModel: 'Sharkbone.App.Models.Chore'
          });
        });
        it('should add a key to prototype.relation', function() {
          return expect(subject.prototype.relations.length).toEqual(1);
        });
        return it('should match the expected relation object', function() {
          return expect(subject.prototype.relations[0]).toEqual({
            type: Backbone.HasOne,
            key: 'task',
            relatedModel: 'Sharkbone.App.Models.Chore'
          });
        });
      });
    });
  });

}).call(this);
