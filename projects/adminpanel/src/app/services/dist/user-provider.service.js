"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserProviderService = void 0;
var core_1 = require("@angular/core");
var UserProviderService = /** @class */ (function () {
    function UserProviderService(apiUsers, localUsers, storage) {
        this.apiUsers = apiUsers;
        this.localUsers = localUsers;
        this.storage = storage;
    }
    Object.defineProperty(UserProviderService.prototype, "currentProvider", {
        get: function () {
            if (this.storage.OffLineMode && this.localUsers.canUse)
                return this.localUsers;
            else
                return this.apiUsers;
        },
        enumerable: false,
        configurable: true
    });
    UserProviderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserProviderService);
    return UserProviderService;
}());
exports.UserProviderService = UserProviderService;
