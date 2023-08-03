import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWidgetComponent } from './components/add-widget/add-widget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WidgetComponent } from './components/widget/widget.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'widget',
    component: WidgetComponent
  },
  {
    path: 'widget/add',
    component: AddWidgetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
