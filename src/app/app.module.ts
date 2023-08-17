import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetComponent } from '././components/widget/widget.component';
import { AddWidgetComponent } from '././components/add-widget/add-widget.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JsRenderTryComponent } from './components/JsRenderTry/JsRenderTry.component';
import { widgetpreviewComponent } from './components/widgetpreview/widgetpreview.component';
import { EditWidgetComponent } from './components/edit-widget/edit-widget.component';
import { PageWizard1Component } from './components/page-wizard1/page-wizard1.component';
import { PagesComponent } from './components/pages/pages.component';
import { AppConfig } from '../config';
@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    AddWidgetComponent,
    DashboardComponent,
    JsRenderTryComponent,
    widgetpreviewComponent,
    EditWidgetComponent,
    PageWizard1Component,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,  
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: 'APP_CONFIG', useValue: AppConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
