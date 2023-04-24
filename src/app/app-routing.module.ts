import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { FormComponent } from './form/form.component';
import { BuscadorComponent } from './buscador/buscador.component';

const routes: Routes = [

  {
    path: '',
    component: PersonasComponent,
    pathMatch: 'full',
  },
  
  {
    path: 'personas',
    component: PersonasComponent,
    
  },
  {
    path: 'personas/form',
    component: FormComponent,
    
  },

  {
    path: 'personas/form/:id',
    component: FormComponent,
    
  },

  {
    path: 'personas/buscador',
    component: BuscadorComponent,
    
  },


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
