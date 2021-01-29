"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserManagementComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var user_model_1 = require("../models/user.model");
var user_create_component_1 = require("../user-create/user-create.component");
var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(userProvider, dialog) {
        this.userProvider = userProvider;
        this.dialog = dialog;
        this.users = [];
        this.expandedElement = null;
        this.displayedColumns = user_model_1.userFiels.filter(function (val) { return val != "password"; });
    }
    UserManagementComponent.prototype.getUsers = function () {
        var _this = this;
        this.userProvider.currentProvider.getUsers().subscribe(function (data) { return _this.users = data; });
    };
    UserManagementComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UserManagementComponent.prototype.addUser = function () {
        var _this = this;
        var dialogRef = this.dialog.open(user_create_component_1.UserCreateComponent, {
            width: '250px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.userProvider.currentProvider.addUser(result).subscribe(function (data) {
                return _this.getUsers();
            });
        });
    };
    UserManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-user-management',
            templateUrl: './user-management.component.html',
            styleUrls: ['./user-management.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], UserManagementComponent);
    return UserManagementComponent;
}());
exports.UserManagementComponent = UserManagementComponent;
