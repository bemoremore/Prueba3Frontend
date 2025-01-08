import { Routes } from '@angular/router';

import { GuardGuard } from './_shared/guard/guard.guard';
import { HomeComponent } from './_shared/components/home/home.component';
import { UserLoginComponent } from './users/components/user-login/user-login.component';
import { UserRegisterComponent } from './users/components/user-register/user-register.component';
import { AllPostsComponent } from './posts/components/all-posts/all-posts.component';
import { PostCreationComponent } from './posts/components/post-creation/post-creation.component';
export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [GuardGuard] },
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: 'posts', component: AllPostsComponent, canActivate: [GuardGuard] },
    { path: 'posts/create', component: PostCreationComponent, canActivate: [GuardGuard] },
    { path: '**', redirectTo: '/login' }
];
