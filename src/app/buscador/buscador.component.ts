import { Component, OnInit } from '@angular/core';
import { Persona } from '../interfaces/persona.interface';
import { PersonaService } from '../services/persona-service.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit{

  searchTerm$ = new BehaviorSubject<string>('');
  OnDestroy$ = new Subject();
  listaFiltrada: Persona [] = [];
  personas: Persona [] = [];

  constructor(
    private personaService: PersonaService,
  ){}


  ngOnInit(): void {
    this.personaService
      .getPersonas()
      .pipe(
        tap((personas: Persona[]) => {
          this.personas = personas;
        })
      )
      .subscribe();

    this.listaFiltrada = this.personas;
    this.filterList();
  }

  
  filterList(): void {
    this.searchTerm$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.OnDestroy$),
      )
      .subscribe(term => {
        this.listaFiltrada = this.personas
          .filter(item => item.perNombre.toLowerCase().indexOf(term.toLowerCase()) >= 0);
          
      });


  }
}
