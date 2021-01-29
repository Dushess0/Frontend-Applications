"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiContactsProviderService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var ApiContactsProviderService = /** @class */ (function () {
    function ApiContactsProviderService(httpService, authService, localContacts) {
        this.httpService = httpService;
        this.authService = authService;
        this.localContacts = localContacts;
    }
    Object.defineProperty(ApiContactsProviderService.prototype, "canUse", {
        get: function () {
            return this.authService.connectionExists;
        },
        enumerable: false,
        configurable: true
    });
    ApiContactsProviderService.prototype.getContacts = function () {
        var result = this.httpService.get(this.authService.identityServerUrl + "/contacts", {
            headers: new http_1.HttpHeaders({
                Authorization: "Berear " + this.authService.token.access_token
            }),
            withCredentials: true
        });
        this.localContacts.addContacts(result);
        return result;
    };
    ApiContactsProviderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiContactsProviderService);
    return ApiContactsProviderService;
}());
exports.ApiContactsProviderService = ApiContactsProviderService;
