import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

// Routes array define component along with the path name for url

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'add-user', component: AddUserComponent },
  { path: 'users', component: UserComponent },
  { path: 'edit-user/:id', component: EditUserComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
