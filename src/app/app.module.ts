import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { SearchcontainerComponent } from './searchcontainer/searchcontainer.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    SearchresultsComponent,
    SearchcontainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
