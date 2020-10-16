import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AdmincrudComponent } from './admincrud/admincrud.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { AddnewuserComponent } from './admincrud/addnewuser/addnewuser.component';

// this array will be responsible for routing of whole project
const routes: Routes = [
   {
      path: '',
      redirectTo: "/home",
      pathMatch: 'full'
   },
   { path: "home", component: HomeComponent },
   { path: "contactus", component: ContactusComponent },
   { path: "login", component: LoginComponent },
   { path: "register", component: RegisterComponent },
   { path: "app", component: AppComponent },
   { path: "admin", component: AdmincrudComponent },
   { path: "admin/addnewuser", component: AddnewuserComponent },
   { path: "header", component: HeaderComponent },
   { path: "user", component: UserComponent },
   { path: "profile", component: ProfileComponent },
   { path: '**', component: HomeComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})

export class AppRoutingModule { }
export const RoutingComponent =
   [HomeComponent,
      AdmincrudComponent,
      ContactusComponent,
      RegisterComponent,
      LoginComponent,
      UserComponent,
      ProfileComponent,
      HeaderComponent,
      AddnewuserComponent];