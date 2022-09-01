import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './accounts/login/login.component';

// Import Containers
import { DefaultLayoutComponent } from './containers';


import { RegisterComponent } from './accounts/register/register.component';

export const routes: Routes = [
  {
    path: '', component: LoginComponent, data: {
      title: 'Login Page'
    }
  },
  {
path:'dashboard',component:DefaultLayoutComponent
  },
  {
    path:'', component:DefaultLayoutComponent, children:[
      {
        path: 'administration',
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
      },
      
    ]
  },
  
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ],
  }
 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
