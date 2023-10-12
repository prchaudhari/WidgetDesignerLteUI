
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
import { EditPageWizard1Component } from './components/edit-page-wizard1/edit-page-wizard1.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { pagepreviewComponent } from './components/pagepreview/pagepreview.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPrintModule } from 'ngx-print';
import { PagesGeneratorComponent } from './components/pages-generator/pages-generator.component';
import { GenerateComponent } from './components/generate/generate.component';
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
    PagesComponent,
    EditPageWizard1Component,
    AddPageComponent,
    pagepreviewComponent,
    EditPageComponent,
    PagesGeneratorComponent,
    GenerateComponent
  ],
  imports: [
    NgxPageScrollCoreModule.forRoot({ duration: 1600 }),
    ScrollingModule,
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,  
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    NgxPrintModule
  ],
  providers: [{ provide: 'APP_CONFIG', useValue: AppConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
