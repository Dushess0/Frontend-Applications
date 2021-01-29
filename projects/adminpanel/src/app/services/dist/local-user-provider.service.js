"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocalUserProviderService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LocalUserProviderService = /** @class */ (function () {
    function LocalUserProviderService(storage) {
        this.storage = storage;
    }
    Object.defineProperty(LocalUserProviderService.prototype, "canUse", {
        get: function () {
            return this.storage.isLocalStorageSupported;
        },
        enumerable: false,
        configurable: true
    });
    LocalUserProviderService.prototype.getUsers = function () {
        var _this = this;
        var users = this.storage.get("users");
        if (users && users.length != 0 && users.length != undefined)
            return rxjs_1.of(users);
        var mockupUsers = [
            {
                name: "Joanna",
                password: "",
                phone_number: "888-888-888",
                surname: "Kowalska",
                work_norm: 1,
                work_type: "TYPE"
            }
        ];
        mockupUsers.forEach(function (element) {
            _this.addUser(element);
        });
        return rxjs_1.of(mockupUsers);
    };
    LocalUserProviderService.prototype.addUser = function (user) {
        var users = this.storage.get("users");
        if (!users || users.length == 0 || users.length == undefined)
            users = [];
        users === null || users === void 0 ? void 0 : users.push(user);
        this.storage.set("users", users);
        return rxjs_1.of(user);
    };
    LocalUserProviderService.prototype.deleteUser = function (id) {
        var users = this.storage.get("users");
        users.splice(id, 1);
        this.storage.set("users", users);
    };
    LocalUserProviderService.prototype.editUser = function (user) {
        var users = this.storage.get("users");
        if (!users)
            return;
        users[user.id || 0] = user;
    };
    LocalUserProviderService.prototype.addUsers = function (result) {
        var _this = this;
        this.storage.remove("users");
        result.subscribe(function (users) {
            return users.forEach(function (user) {
                _this.addUser(user);
            });
        });
    };
    LocalUserProviderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocalUserProviderService);
    return LocalUserProviderService;
}());
exports.LocalUserProviderService = LocalUserProviderService;
