import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
//import { MatSelectModule } from '@angular/material';
//import { MatInputModule } from '@angular/material';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatFormFieldControl} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'; 
import { AgmCoreModule } from '@agm/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
//import { ModalModule } from 'ngx-bootstrap';
//import {ModalDirective} from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    RoundProgressModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyA144ETcnXTpwaW6hNt3jDRbG8E659IPTQ"
    })
    //MatInputModule,
    //MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
