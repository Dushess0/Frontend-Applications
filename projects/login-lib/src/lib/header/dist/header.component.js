"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService, storage, router) {
        this.authService = authService;
        this.storage = storage;
        this.router = router;
        this.loggedIn = false;
    }
    HeaderComponent.prototype.disableOfflineMode = function () {
        this.storage.OffLineMode = false;
        this.router.navigateByUrl(this.router.createUrlTree(['/login'], {}));
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.currentUser$.subscribe(function (user) {
            _this.userName = user.name;
            _this.loggedIn = true;
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
