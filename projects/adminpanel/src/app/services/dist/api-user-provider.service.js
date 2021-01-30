"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiUserProviderService = void 0;
var core_1 = require("@angular/core");
var ApiUserProviderService = /** @class */ (function () {
    function ApiUserProviderService(httpService, authService, localUsers) {
        this.httpService = httpService;
        this.authService = authService;
        this.localUsers = localUsers;
    }
    Object.defineProperty(ApiUserProviderService.prototype, "canUse", {
        get: function () {
            return this.authService.connectionExists;
        },
        enumerable: false,
        configurable: true
    });
    ApiUserProviderService.prototype.editUser = function (user) {
        this.httpService.put(this.authService.identityServerUrl + "/users", user);
    };
    ApiUserProviderService.prototype.getUsers = function () {
        var result = this.httpService.get(this.authService.identityServerUrl + "/users");
        this.localUsers.addUsers(result);
        return result;
    };
    ApiUserProviderService.prototype.addUser = function (user) {
        return this.httpService.post(this.authService.identityServerUrl + "/create_user", user);
    };
    ApiUserProviderService.prototype.deleteUser = function (id) {
        return this.httpService["delete"](this.authService.identityServerUrl + "/users/" + id);
    };
    ApiUserProviderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiUserProviderService);
    return ApiUserProviderService;
}());
exports.ApiUserProviderService = ApiUserProviderService;
