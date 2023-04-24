import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonasComponent } from './personas/personas.component';
import { CaracteriticaComponent } from './caracteritica/caracteritica.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { BuscadorComponent } from './buscador/buscador.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select'; 

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    CaracteriticaComponent,
    FormComponent,
    BuscadorComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    RouterModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    
  ],

  exports: [
    FormComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]

})

export class AppModule { }
