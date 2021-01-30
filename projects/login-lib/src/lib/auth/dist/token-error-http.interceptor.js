"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenErrorInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var TokenErrorInterceptor = /** @class */ (function () {
    function TokenErrorInterceptor(authService, router, localStorage) {
        this.authService = authService;
        this.router = router;
        this.localStorage = localStorage;
    }
    TokenErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request)
            .pipe(operators_1.catchError(function (error) {
            if (error.status == 403 && !_this.localStorage.OffLineMode) {
                _this.router.navigateByUrl(_this.router.createUrlTree(['/login'], {}));
            }
            return rxjs_1.throwError(error);
        }));
    };
    TokenErrorInterceptor = __decorate([
        core_1.Injectable()
    ], TokenErrorInterceptor);
    return TokenErrorInterceptor;
}());
exports.TokenErrorInterceptor = TokenErrorInterceptor;
