import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWidgetComponent } from './components/add-widget/add-widget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WidgetComponent } from './components/widget/widget.component';
import { JsRenderTryComponent } from './components/JsRenderTry/JsRenderTry.component';
import { widgetpreviewComponent } from './components/widgetpreview/widgetpreview.component';

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
  },
  {
    path: 'widgetpreview/:css',
    component: widgetpreviewComponent
  },
  {
    path: 'widgetpreview',
    component: widgetpreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
