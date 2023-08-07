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
@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    AddWidgetComponent,
    DashboardComponent,
    JsRenderTryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,  
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
