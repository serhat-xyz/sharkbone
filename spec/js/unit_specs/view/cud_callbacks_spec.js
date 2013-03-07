// Generated by CoffeeScript 1.5.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe('Sharkbone.Modules.CUDCallbacks', function() {
    var server, subject;
    subject = Sharkbone.Modules.CUDCallbacks;
    server = null;
    beforeEach(function() {
      subject._afterSuccessfulCreate = [];
      subject._afterSuccessfulUpdate = [];
      subject._afterSuccessfulDestroy = [];
      subject._afterFailingCreate = [];
      subject._afterFailingUpdate = [];
      subject._afterFailingDestroy = [];
      subject.remove = jasmine.createSpy('remove').andReturn(1);
      subject.goToIndex = jasmine.createSpy('goToIndex').andReturn(1);
      subject.goToShow = jasmine.createSpy('goToShow').andReturn(1);
      return server = sinon.fakeServer.create();
    });
    afterEach(function() {
      return server.restore();
    });
    it('should be defined', function() {
      return expect(subject).toBeDefined();
    });
    describe('Callback containers', function() {
      it('_afterSuccessfulCreate', function() {
        return expect(subject._afterSuccessfulCreate).toEqual([]);
      });
      it('_afterSuccessfulUpdate', function() {
        return expect(subject._afterSuccessfulUpdate).toEqual([]);
      });
      it('_afterSuccessfulDestroy', function() {
        return expect(subject._afterSuccessfulDestroy).toEqual([]);
      });
      it('_afterFailingCreate', function() {
        return expect(subject._afterFailingCreate).toEqual([]);
      });
      it('_afterFailingUpdate', function() {
        return expect(subject._afterFailingUpdate).toEqual([]);
      });
      return it('_afterFailingDestroy', function() {
        return expect(subject._afterFailingDestroy).toEqual([]);
      });
    });
    describe('callbacks', function() {
      beforeEach(function() {
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
        spyOn(subject, 'registerCallback').andCallThrough();
        spyOn(subject, 'registerCallbacks').andCallThrough();
        spyOn(subject, 'callbacksFor').andCallThrough();
        subject.successCallback = jasmine.createSpy('successCallback').andCallFake(function() {
          return null;
        });
        subject.errorCallback = jasmine.createSpy('errorCallback').andCallFake(function() {
          return null;
        });
        subject.collection = new Sharkbone.App.Collections.Users();
        subject.model = new Sharkbone.App.Models.User();
        subject.model.set({
          name: 'John',
          last_name: 'Doe'
        });
        _(subject).extend(Sharkbone.Modules.CUD);
        server.respondWith('POST', 'users', [
          201, {
            'Content-Tpye': 'application/json'
          }, '{"id": 1, "name": "John", "last_name": "Doe"}'
        ]);
        server.respondWith('PUT', 'users/1', [
          204, {
            'Content-Tpye': 'application/json'
          }, ''
        ]);
        return server.respondWith('DELETE', 'users/1', [
          204, {
            'Content-Tpye': 'application/json'
          }, ''
        ]);
      });
      describe('afterCreate', function() {
        beforeEach(function() {
          subject.initializeCudContainers();
          spyOn(subject, 'afterCreate').andCallThrough();
          spyOn(subject, 'runCallbacksFor').andCallThrough();
          subject.afterCreate(subject.successCallback);
          return subject.afterFailingCreate(subject.errorCallback);
        });
        it('should be called with a successCallback', function() {
          expect(subject.afterCreate).toHaveBeenCalled();
          return expect(subject.afterCreate).toHaveBeenCalledWith(subject.successCallback);
        });
        it('registerCallbacks properly called', function() {
          return expect(subject.registerCallbacks).toHaveBeenCalledWith(subject._afterSuccessfulCreate, {
            0: subject.successCallback
          });
        });
        it('registerCallback properly called', function() {
          return expect(subject.registerCallback).toHaveBeenCalledWith(subject._afterSuccessfulCreate, subject.successCallback);
        });
        it('should add successCallback to _afterSuccessfulCreate', function() {
          expect(subject._afterSuccessfulCreate.length).toEqual(1);
          return expect(subject._afterSuccessfulCreate[0]).toEqual(subject.successCallback);
        });
        it('should call successCallback afterCreate', function() {
          subject.create();
          server.respond();
          return expect(subject.successCallback).toHaveBeenCalled();
        });
        it('should call runCallbacksFor with proper arguments', function() {
          subject.create();
          server.respond();
          return expect(subject.runCallbacksFor).toHaveBeenCalledWith(subject._afterSuccessfulCreate, subject.model);
        });
        return it('should call callbacksFor with proper arguments', function() {
          subject.create();
          server.respond();
          return expect(subject.callbacksFor).toHaveBeenCalledWith(subject._afterSuccessfulCreate, subject.model);
        });
      });
      describe('afterUpdate', function() {
        beforeEach(function() {
          subject.initializeCudContainers();
          spyOn(subject, 'afterUpdate').andCallThrough();
          spyOn(subject, 'runCallbacksFor').andCallThrough();
          subject.afterUpdate(subject.successCallback);
          subject.afterFailingUpdate(subject.errorCallback);
          return subject.model = new Sharkbone.App.Models.User({
            id: 1,
            name: 'Foo',
            last_name: 'Bar'
          });
        });
        it('should be called with a successCallback', function() {
          expect(subject.afterUpdate).toHaveBeenCalled();
          return expect(subject.afterUpdate).toHaveBeenCalledWith(subject.successCallback);
        });
        it('registerCallbacks properly called', function() {
          expect(subject.registerCallbacks).toHaveBeenCalled();
          return expect(subject.registerCallbacks).toHaveBeenCalledWith(subject._afterSuccessfulUpdate, {
            0: subject.successCallback
          });
        });
        it('registerCallback properly called', function() {
          return expect(subject.registerCallback).toHaveBeenCalledWith(subject._afterSuccessfulUpdate, subject.successCallback);
        });
        it('should add successCallback to _afterSuccessfulUpdate', function() {
          expect(subject._afterSuccessfulUpdate.length).toEqual(1);
          return expect(subject._afterSuccessfulUpdate[0]).toEqual(subject.successCallback);
        });
        xit('should call successCallback afterUpdate', function() {
          subject.update();
          server.respond();
          expect(subject.successCallback).toHaveBeenCalled();
          return expect(subject.errorCallback).toHaveBeenCalled();
        });
        xit('should call runCallbacksFor with proper arguments', function() {
          subject.update();
          server.respond();
          console.log(server);
          expect(subject._afterSuccessfulUpdate.length).toEqual(1);
          expect(subject._afterSuccessfulUpdate[0]).toEqual(subject.successCallback);
          return expect(subject.runCallbacksFor).toHaveBeenCalledWith(subject._afterSuccessfulUpdate, subject.model);
        });
        return xit('should call callbacksFor with proper arguments', function() {
          subject.update();
          server.respond();
          return expect(subject.callbacksFor).toHaveBeenCalledWith(subject._afterSuccessfulUpdate, subject.model);
        });
      });
      return describe('afterDestroy', function() {
        beforeEach(function() {
          subject._afterSuccessfulDestroy = [];
          subject._afterFailingDestroy = [];
          spyOn(subject, 'afterDestroy').andCallThrough();
          spyOn(subject, 'runCallbacksFor').andCallThrough();
          subject.afterDestroy(subject.successCallback);
          return subject.afterFailingDestroy(subject.errorCallback);
        });
        it('should be called with a successCallback', function() {
          expect(subject.afterDestroy).toHaveBeenCalled();
          return expect(subject.afterDestroy).toHaveBeenCalledWith(subject.successCallback);
        });
        it('registerCallbacks properly called', function() {
          expect(subject.registerCallbacks).toHaveBeenCalled();
          return expect(subject.registerCallbacks).toHaveBeenCalledWith(subject._afterSuccessfulDestroy, {
            0: subject.successCallback
          });
        });
        it('registerCallback properly called', function() {
          return expect(subject.registerCallback).toHaveBeenCalledWith(subject._afterSuccessfulDestroy, subject.successCallback);
        });
        it('should add successCallback to _afterSuccessfulDestroy', function() {
          expect(subject._afterSuccessfulDestroy.length).toEqual(1);
          return expect(subject._afterSuccessfulDestroy[0]).toEqual(subject.successCallback);
        });
        xit('should call successCallback afterDestroy', function() {
          subject.destroy();
          server.respond();
          console.log(server);
          expect(subject.successCallback).toHaveBeenCalled();
          return expect(subject.errorCallback).toHaveBeenCalled();
        });
        xit('should call runCallbacksFor with proper arguments', function() {
          subject.destroy();
          server.respond();
          return expect(subject.runCallbacksFor).toHaveBeenCalledWith(subject._afterSuccessfulDestroy, subject.model);
        });
        return xit('should call callbacksFor with proper arguments', function() {
          subject.destroy();
          server.respond();
          return expect(subject.callbacksFor).toHaveBeenCalledWith(subject._afterSuccessfulDestroy, subject.model);
        });
      });
    });
    return describe('initializeDefaultCallbacks', function() {
      beforeEach(function() {
        spyOn(subject, 'afterCreate').andCallThrough();
        spyOn(subject, 'afterUpdate').andCallThrough();
        spyOn(subject, 'afterDestroy').andCallThrough();
        return subject.initializeDefaultCallbacks();
      });
      it('should have called afterCreate', function() {
        return expect(subject.afterCreate).toHaveBeenCalled();
      });
      it('should have called afterUpdate', function() {
        return expect(subject.afterUpdate).toHaveBeenCalled();
      });
      it('should have called afterDestroy', function() {
        return expect(subject.afterDestroy).toHaveBeenCalled();
      });
      it('should add 2 callbacks to _afterSuccessfulCreate', function() {
        return expect(subject._afterSuccessfulCreate.length).toEqual(2);
      });
      it('should add 2 callbacks to _afterSuccessfulUpdate', function() {
        return expect(subject._afterSuccessfulUpdate.length).toEqual(2);
      });
      return it('should add 1 callback to _afterSuccessfulDestroy', function() {
        return expect(subject._afterSuccessfulDestroy.length).toEqual(1);
      });
    });
  });

}).call(this);
