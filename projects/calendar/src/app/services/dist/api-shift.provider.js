"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiShiftProvider = exports.dateToAPI = void 0;
var core_1 = require("@angular/core");
function dateToAPI(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
exports.dateToAPI = dateToAPI;
var ApiShiftProvider = /** @class */ (function () {
    function ApiShiftProvider(httpService, authService, localShifts) {
        this.httpService = httpService;
        this.authService = authService;
        this.localShifts = localShifts;
    }
    ApiShiftProvider.prototype.addShift = function (user) {
        throw new Error("Method not implemented.");
    };
    ApiShiftProvider.prototype.getShifts = function (from, to) {
        var _a;
        var start = dateToAPI(from);
        var end = dateToAPI(to);
        var result = this.httpService.get(this.authService.identityServerUrl + "/worker_shifts/" + ((_a = this.authService.user) === null || _a === void 0 ? void 0 : _a.id) + "?from=" + start + "&to=" + end);
        this.localShifts.addShifts(result);
        return result;
    };
    Object.defineProperty(ApiShiftProvider.prototype, "canUse", {
        get: function () {
            return this.authService.connectionExists;
        },
        enumerable: false,
        configurable: true
    });
    ApiShiftProvider = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiShiftProvider);
    return ApiShiftProvider;
}());
exports.ApiShiftProvider = ApiShiftProvider;
