"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginLibModule = void 0;
var core_1 = require("@angular/core");
var callback_url_page_component_1 = require("./callback-url/callback-url-page.component");
var forbidden_page_component_1 = require("./forbidden-page/forbidden-page.component");
var header_component_1 = require("./header/header.component");
var material_module_1 = require("./material/material.module");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var local_storage_service_1 = require("./local-storage.service");
var auth_guard_service_1 = require("./auth/auth-guard.service");
var auth_service_1 = require("./auth/auth.service");
var http_1 = require("@angular/common/http");
var auth_header_http_interceptor_1 = require("./auth/auth-header-http.interceptor");
var token_error_http_interceptor_1 = require("./auth/token-error-http.interceptor");
var LoginLibModule = /** @class */ (function () {
    function LoginLibModule() {
    }
    LoginLibModule = __decorate([
        core_1.NgModule({
            declarations: [
                header_component_1.HeaderComponent,
                forbidden_page_component_1.ForbiddenPageComponent,
                callback_url_page_component_1.CallbackUrlPageComponent,
            ],
            imports: [common_1.CommonModule, material_module_1.MaterialModule, platform_browser_1.BrowserModule],
            providers: [
                auth_service_1.AuthService,
                auth_guard_service_1.AuthGuardService,
                local_storage_service_1.LocalStorageService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth_header_http_interceptor_1.AuthHeaderInterceptor,
                    multi: true
                },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_error_http_interceptor_1.TokenErrorInterceptor,
                    multi: true
                }
            ],
            exports: [header_component_1.HeaderComponent, forbidden_page_component_1.ForbiddenPageComponent, callback_url_page_component_1.CallbackUrlPageComponent]
        })
    ], LoginLibModule);
    return LoginLibModule;
}());
exports.LoginLibModule = LoginLibModule;
