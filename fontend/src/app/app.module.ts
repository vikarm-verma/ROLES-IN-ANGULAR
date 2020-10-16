import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AppRoutingModule, RoutingComponent } from './routing-module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdmincrudComponent } from './admincrud/admincrud.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AddnewuserComponent } from "./admincrud/addnewuser/addnewuser.component";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactusComponent,
    RoutingComponent,
    LoginComponent,
    RegisterComponent,
    AdmincrudComponent,
    UserComponent,
    HeaderComponent,
    ProfileComponent,
    AddnewuserComponent,
    ConfirmDialogComponent,
    AlertDialogComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    DataTablesModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
