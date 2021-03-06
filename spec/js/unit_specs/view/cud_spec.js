// Generated by CoffeeScript 1.5.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe('Sharkbone.Modules.CUD', function() {
    var options, server, subject;
    subject = Sharkbone.Modules.CUD;
    server = null;
    options = {};
    beforeEach(function() {
      server = sinon.fakeServer.create();
      options = {};
      Sharkbone.App.Models.User = (function(_super) {

        __extends(User, _super);

        function User() {
          User.__super__.constructor.apply(this, arguments);
        }

        User.prototype.urlRoot = 'users';

        return User;

      })(Sharkbone.Model);
      Sharkbone.App.Collections.Users = (function(_super) {

        __extends(Users, _super);

        function Users() {
          Users.__super__.constructor.apply(this, arguments);
        }

        Users.prototype.model = Sharkbone.App.Models.User;

        Users.prototype.url = '/users';

        return Users;

      })(Sharkbone.Collection);
      Sharkbone.App.Models.User.setup();
      subject.collection = new Sharkbone.App.Collections.Users();
      subject.model = new Sharkbone.App.Models.User();
      spyOn(subject.collection, 'create').andCallThrough();
      spyOn(subject.collection, 'get').andCallThrough();
      spyOn(subject.collection, 'remove').andCallThrough();
      spyOn(subject.model, 'save').andCallThrough();
      spyOn(subject.model, 'destroy').andCallThrough();
      server.respondWith('POST', 'users', [
        201, {
          'Content-Type': 'application/json'
        }, '{"id": 1, "name": "John", "last_name": "Doe"}'
      ]);
      server.respondWith('PUT', 'users/1', [
        204, {
          'Content-Type': 'application/json'
        }, ''
      ]);
      return server.respondWith('DELETE', 'users/1', [
        204, {
          'Content-Type': 'application/json'
        }, ''
      ]);
    });
    afterEach(function() {
      return server.restore();
    });
    it('should be defined', function() {
      return expect(subject).toBeDefined();
    });
    describe('create', function() {
      beforeEach(function() {
        return spyOn(subject, 'create').andCallThrough();
      });
      it('should be defined', function() {
        return expect(subject.create).toBeDefined();
      });
      describe('called without options', function() {
        beforeEach(function() {
          subject.create();
          return server.respond();
        });
        it('should call create on collection', function() {
          return expect(subject.collection.create).toHaveBeenCalled();
        });
        return it('should call create on collection with model', function() {
          return expect(subject.collection.create.calls[0].args[0]).toEqual(subject.model);
        });
      });
      return describe('called as event callback', function() {
        beforeEach(function() {
          options.preventDefault = jasmine.createSpy('preventDefault').andCallFake(function() {
            return null;
          });
          options.stopPropagation = jasmine.createSpy('stopPropagation').andCallFake(function() {
            return null;
          });
          subject.create(options);
          return server.respond();
        });
        it('should prevent default event', function() {
          return expect(options.preventDefault).toHaveBeenCalled();
        });
        return it('should stop propagation', function() {
          return expect(options.stopPropagation).toHaveBeenCalled();
        });
      });
    });
    describe('update', function() {
      beforeEach(function() {
        return spyOn(subject, 'update').andCallThrough();
      });
      it('should be defined', function() {
        return expect(subject.update).toBeDefined();
      });
      describe('called without options', function() {
        beforeEach(function() {
          subject.update();
          return server.respond();
        });
        it('should call save on model', function() {
          return expect(subject.model.save).toHaveBeenCalled();
        });
        return it('should call create on collection with model', function() {
          return expect(subject.model.save.calls[0].args[0]).toEqual(void 0);
        });
      });
      return describe('called as event callback', function() {
        beforeEach(function() {
          options.preventDefault = jasmine.createSpy('preventDefault').andCallFake(function() {
            return null;
          });
          options.stopPropagation = jasmine.createSpy('stopPropagation').andCallFake(function() {
            return null;
          });
          subject.update(options);
          return server.respond();
        });
        it('should prevent default event', function() {
          return expect(options.preventDefault).toHaveBeenCalled();
        });
        return it('should stop propagation', function() {
          return expect(options.stopPropagation).toHaveBeenCalled();
        });
      });
    });
    describe('destroy', function() {
      beforeEach(function() {
        spyOn(subject, 'destroy').andCallThrough();
        return subject.destroyConfirmation(true);
      });
      it('should be defined', function() {
        return expect(subject.destroy).toBeDefined();
      });
      describe('called without options', function() {
        beforeEach(function() {
          subject.destroy();
          return server.respond();
        });
        it('should call destroy on model', function() {
          return expect(subject.model.destroy).toHaveBeenCalled();
        });
        return it('should call destroy on model only once', function() {
          return expect(subject.model.destroy.calls.length).toEqual(1);
        });
      });
      describe('called with id', function() {
        beforeEach(function() {
          subject.create();
          subject.collection.add(subject.model);
          subject.destroy(1);
          return server.respond();
        });
        it('should call destroy on model', function() {
          return expect(subject.model.destroy).toHaveBeenCalled();
        });
        it('should call destroy on model only once', function() {
          return expect(subject.model.destroy.calls.length).toEqual(1);
        });
        it('should call remove on the collection', function() {
          return expect(subject.collection.remove).toHaveBeenCalled();
        });
        it('should call remove on the collection only once', function() {
          return expect(subject.collection.remove.calls.length).toEqual(1);
        });
        it('should call get on the collection', function() {
          return expect(subject.collection.get).toHaveBeenCalled();
        });
        return it('should call get on the collection with id 1', function() {
          return expect(subject.collection.get).toHaveBeenCalledWith(1);
        });
      });
      return describe('called as event callback', function() {
        beforeEach(function() {
          options.preventDefault = jasmine.createSpy('preventDefault').andCallFake(function() {
            return null;
          });
          options.stopPropagation = jasmine.createSpy('stopPropagation').andCallFake(function() {
            return null;
          });
          subject.destroy(options);
          return server.respond();
        });
        it('should prevent default event', function() {
          return expect(options.preventDefault).toHaveBeenCalled();
        });
        it('should stop propagation', function() {
          return expect(options.stopPropagation).toHaveBeenCalled();
        });
        it('should call destroy on subject.model', function() {
          return expect(subject.model.destroy).toHaveBeenCalled();
        });
        return it('should call destroy on model only once', function() {
          return expect(subject.model.destroy.calls.length).toEqual(1);
        });
      });
    });
    describe('runCallbacksFor', function() {
      return it('should be defined', function() {
        return expect(subject.runCallbacksFor).toBeDefined();
      });
    });
    return describe('destroyConfirmation', function() {
      it('should be defined', function() {
        return expect(subject.destroyConfirmation).toBeDefined();
      });
      return it('should register a destroyConfirmation', function() {
        var dcf;
        dcf = jasmine.createSpy('dcf').andCallFake(function() {
          return null;
        });
        subject.destroyConfirmation(dcf);
        return expect(subject.__destroyConfirmation).toEqual(dcf);
      });
    });
  });

}).call(this);
