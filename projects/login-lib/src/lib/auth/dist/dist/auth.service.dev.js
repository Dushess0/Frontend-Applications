"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

exports.__esModule = true;
exports.AuthService = void 0;

var core_1 = require("@angular/core");

var rxjs_1 = require("rxjs");

var operators_1 = require("rxjs/operators");

var AuthService =
/** @class */
function () {
  function AuthService(http, router, environment) {
    this.http = http;
    this.router = router;
    this.token = {
      access_token: '',
      refresh_token: '',
      expires: 0,
      token_type: ''
    };
    this.authenticatedState$ = new rxjs_1.Subject();
    this.currentUser$ = new rxjs_1.Subject();
    this.connectionExists = false;
    this.identityServerUrl = 'http://localhost:8000';
    this.clientId = '';
    this.currentInterval = 1000;
    this.source = rxjs_1.interval(this.currentInterval);
    this.pingSubscription = this.pingServer();
    this.clientId = environment.clientId;
  }

  Object.defineProperty(AuthService.prototype, "callbackUrl", {
    get: function get() {
      var base = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
      return base + "/callback-url";
    },
    enumerable: false,
    configurable: true
  });

  AuthService.prototype.pingServer = function () {
    var _this = this;

    return this.source.subscribe(function () {
      _this.http.get(_this.identityServerUrl + "/is_active", {
        observe: 'response'
      }).subscribe(function (resp) {
        _this.connectionExists = resp.status === 200;

        _this.pingSubscription.unsubscribe();
      }, function (err) {
        _this.pingSubscription.unsubscribe();

        _this.currentInterval += 5000;
        _this.source = rxjs_1.interval(_this.currentInterval);
        _this.pingSubscription = _this.pingServer();
      });
    });
  };

  AuthService.prototype.isAuthenticated = function () {
    var _this = this;

    return this.http.get(this.identityServerUrl + "/introspect", {
      observe: 'response'
    }).pipe(operators_1.map(function (response) {
      var _a, _b;

      var isAuthenticated = {
        isAuthenticated: (_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a.is_authenticated) !== null && _b !== void 0 ? _b : false
      };

      _this.authenticatedState$.next(isAuthenticated);

      return isAuthenticated;
    }), operators_1.catchError(function (_) {
      return rxjs_1.of({
        isAuthenticated: false
      });
    }));
  };

  AuthService.prototype.authenticate = function () {
    this.router.navigateByUrl(this.router.createUrlTree(['/callback-url'], {}));
    var url = this.identityServerUrl + "/login?callback_url=" + this.callbackUrl + "&client_id=" + this.clientId;
    window.location.replace(url);
  };

  AuthService.prototype.register = function () {
    this.router.navigateByUrl(this.router.createUrlTree(['/callback-url'], {}));
    var url = this.identityServerUrl + "/register?callback_url=" + this.callbackUrl + "&client_id=" + this.clientId;
    window.location.replace(url);
  };

  AuthService.prototype.getUserInfo = function () {
    var _this = this;

    var url = this.identityServerUrl + "/user";
    return this.http.get(url).pipe(operators_1.tap(function (user) {
      _this.user = user;

      _this.currentUser$.next(user);
    }));
  };

  AuthService.prototype.logout = function () {
    var _a;

    var url = this.identityServerUrl + "/revoke";
    return this.http.post(url, {
      client_id: this.clientId,
      // TODO currently user is alway undefined
      user_id: (_a = this.user) === null || _a === void 0 ? void 0 : _a.id
    }).subscribe(function () {
      location.reload();
    });
  };

  AuthService.prototype.getAccessToken = function (code) {
    var _this = this;

    var url = this.identityServerUrl + "/token?code=" + code;
    return this.http.get(url).pipe(operators_1.tap(function (token) {
      _this.token = token;
    }));
  };

  AuthService = __decorate([core_1.Injectable({
    providedIn: 'root'
  }), __param(2, core_1.Inject('clientID'))], AuthService);
  return AuthService;
}();

exports.AuthService = AuthService;