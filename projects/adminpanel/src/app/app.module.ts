import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { LoginLibModule, MaterialModule } from 'login-lib';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalStorageService } from './services/local-storage.service';


@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    UserCreateComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    LoginLibModule,
    MatTableModule,
    MatFormFieldModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
