import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form1Component } from './form1/form1.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'form1',
    component: Form1Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
