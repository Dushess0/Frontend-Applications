"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocalContactsProviderService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LocalContactsProviderService = /** @class */ (function () {
    function LocalContactsProviderService(storage) {
        this.storage = storage;
    }
    Object.defineProperty(LocalContactsProviderService.prototype, "canUse", {
        get: function () {
            return this.storage.isLocalStorageSupported;
        },
        enumerable: false,
        configurable: true
    });
    LocalContactsProviderService.prototype.getContacts = function () {
        var _this = this;
        var users = this.storage.get("contacts");
        if (users && users.length != 0 && users.length != undefined)
            return rxjs_1.of(users);
        var mockupUsers = [
            {
                name: "John",
                surname: "Doe",
                phoneNumber: "+485736273"
            }
        ];
        mockupUsers.forEach(function (element) {
            _this.addContact(element);
        });
        return rxjs_1.of(mockupUsers);
    };
    LocalContactsProviderService.prototype.addContact = function (model) {
        var contacts = this.storage.get("contacts");
        if (!contacts || contacts.length == 0 || contacts.length == undefined)
            contacts = [];
        contacts === null || contacts === void 0 ? void 0 : contacts.push(model);
        this.storage.set("contacts", contacts);
        return rxjs_1.of(model);
    };
    LocalContactsProviderService.prototype.addContacts = function (result) {
        var _this = this;
        this.storage.remove("contacts");
        result.subscribe(function (users) {
            users.forEach(function (user) {
                _this.addContact(user);
            });
        });
    };
    LocalContactsProviderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocalContactsProviderService);
    return LocalContactsProviderService;
}());
exports.LocalContactsProviderService = LocalContactsProviderService;
