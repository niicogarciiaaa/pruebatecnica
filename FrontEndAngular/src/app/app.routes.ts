import { Routes } from '@angular/router';
import { UserListComponent } from './features/user-list/user-list.component';
import { UserDetailComponent } from './features/user-detail/user-detail.component';
import { UserCreateComponent } from './features/user-create/user-create.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: 'full'
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'user/:id',
    component: UserDetailComponent
  },
  {
    path: 'user-create',
    component: UserCreateComponent
  },
  {
    path: 'user-edit/:id',
    component: UserCreateComponent,
    data: { edit: true }
  },
];
