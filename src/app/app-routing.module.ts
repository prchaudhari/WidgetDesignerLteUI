import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWidgetComponent } from './components/add-widget/add-widget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WidgetComponent } from './components/widget/widget.component';
import { JsRenderTryComponent } from './components/JsRenderTry/JsRenderTry.component';

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
  },
  {
    path: 'JsRenderTry',
    component: JsRenderTryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
