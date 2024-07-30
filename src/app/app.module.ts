
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TextEditor } from './textEditor/textEditor.component';
//Angular Router Module
import { RouterModule } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

@NgModule({
  declarations: [
    AppComponent,
    TextEditor
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterTestingModule,
    RouterModule.forRoot([
      { path:'', component: TextEditor }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
