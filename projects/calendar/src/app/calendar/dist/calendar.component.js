"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CalendarComponent = void 0;
var core_1 = require("@angular/core");
var shift_dialog_component_1 = require("../shift-dialog/shift-dialog.component");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(shiftProvider, dialog, authService) {
        this.shiftProvider = shiftProvider;
        this.dialog = dialog;
        this.authService = authService;
        this.chunks = [];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        var firstDay = new Date();
        firstDay.setDate(1);
        var lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);
        this.authService.currentUser$.subscribe(function (data) {
            _this.shiftProvider.currentProvider.getShifts(firstDay, lastDay).subscribe(function (data) {
                _this.chunks = _this.generateMonth(data);
            });
        });
    };
    CalendarComponent.prototype.generateMonth = function (data) {
        this.chunks = [];
        var firstDay = data[0].day;
        var lastDay = data[0].day;
        data.forEach(function (element) {
            if (!firstDay || element.day < firstDay)
                firstDay = element.day;
            if (!lastDay || element.day > lastDay)
                lastDay = element.day;
        });
        firstDay = new Date(firstDay);
        lastDay = new Date(lastDay);
        var arr = [];
        var daysIn = this.daysInMonth(firstDay.getMonth(), firstDay.getFullYear());
        for (var index = 1; index <= daysIn; index++) {
            arr.push({
                date: new Date(firstDay.getFullYear(), firstDay.getMonth(), index),
                shifts: []
            });
        }
        data.forEach(function (element) {
            var day = new Date(element.day);
            var index = arr.findIndex(function (date) { return date.date.getDate() === day.getDate(); });
            arr[index].shifts.push(element);
        });
        var offset = arr[0].date.getDay() - 1;
        for (var index = 0; index < offset; index++) {
            arr.unshift({ date: new Date(), shifts: [], isEmpty: true });
        }
        return this.chunkArray(arr, 7);
    };
    CalendarComponent.prototype.daysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };
    CalendarComponent.prototype.showDetailed = function (day) {
        var dialogRef = this.dialog.open(shift_dialog_component_1.ShiftDialogComponent, { data: day });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    CalendarComponent.prototype.chunkArray = function (myArray, chunk_size) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
        for (index = 0; index < arrayLength; index += chunk_size) {
            var myChunk = myArray.slice(index, index + chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }
        return tempArray;
    };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'app-calendar',
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.scss']
        })
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
