"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocalShiftProvider = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LocalShiftProvider = /** @class */ (function () {
    function LocalShiftProvider(storage) {
        this.storage = storage;
    }
    LocalShiftProvider.prototype.getShifts = function (from, to) {
        var _this = this;
        var shifts = this.storage.get("shifts");
        if (shifts && shifts.length != 0 && shifts.length != undefined)
            return rxjs_1.of(shifts);
        var mockupShifts = [
            {
                code: "1",
                day: new Date("2021-01-04"),
                fromHour: 7,
                isWorking: true,
                name: "L",
                toHour: 20,
                worker_id: 2
            }
        ];
        mockupShifts.forEach(function (element) {
            _this.addShift(element);
        });
        return rxjs_1.of(mockupShifts);
    };
    Object.defineProperty(LocalShiftProvider.prototype, "canUse", {
        get: function () {
            return this.storage.isLocalStorageSupported;
        },
        enumerable: false,
        configurable: true
    });
    LocalShiftProvider.prototype.addShift = function (shift) {
        var shifts = this.storage.get("shifts");
        if (!shifts || shifts.length == 0 || shifts.length == undefined)
            shifts = [];
        shifts === null || shifts === void 0 ? void 0 : shifts.push(shift);
        this.storage.set("shifts", shift);
        return rxjs_1.of(shift);
    };
    LocalShiftProvider.prototype.addShifts = function (result) {
        var _this = this;
        this.storage.remove("shifts");
        result.subscribe(function (shifts) {
            return shifts.forEach(function (shift) {
                _this.addShift(shift);
            });
        });
    };
    LocalShiftProvider = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocalShiftProvider);
    return LocalShiftProvider;
}());
exports.LocalShiftProvider = LocalShiftProvider;
