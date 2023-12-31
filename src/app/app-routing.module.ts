import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWidgetComponent } from './components/add-widget/add-widget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WidgetComponent } from './components/widget/widget.component';
import { JsRenderTryComponent } from './components/JsRenderTry/JsRenderTry.component';
import { widgetpreviewComponent } from './components/widgetpreview/widgetpreview.component';
import { EditWidgetComponent } from './components/edit-widget/edit-widget.component';
import { PageWizard1Component } from './components/page-wizard1/page-wizard1.component';
import { PagesComponent } from './components/pages/pages.component';
import { EditPageWizard1Component } from './components/edit-page-wizard1/edit-page-wizard1.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { pagepreviewComponent } from './components/pagepreview/pagepreview.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { PagesGeneratorComponent } from './components/pages-generator/pages-generator.component';
import { GenerateComponent } from './components/generate/generate.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetComponent
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
  },
  {
    path: 'widget/edit/:id',
    component: EditWidgetComponent
  },
  {
    path: 'pages',
    component: PagesComponent
  },
  {
    path: 'page-wizard1',
    component: PageWizard1Component
  },
  {
    path: 'pages/add',
    component: PageWizard1Component
  },
  {
    path: 'pages/addpage',
    component: AddPageComponent
  },
  {
    path: 'page/edit/:id',
    component: EditPageWizard1Component
  },
  {
    path: 'pagepreview',
    component: pagepreviewComponent
  },
  {
    path: 'pages/editpage',
    component: EditPageComponent
  },
  {
    path: 'pages-generator',
    component: PagesGeneratorComponent
  },
  {
    path: 'pages/generate',
    component: GenerateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
