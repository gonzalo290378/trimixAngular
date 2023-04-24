import { Component, Input } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Persona } from '../interfaces/persona.interface';

@Component({
  selector: 'app-caracteritica',
  templateUrl: './caracteritica.component.html',
  styleUrls: ['./caracteritica.component.css']
})
export class CaracteriticaComponent {

  constructor(
    public modalService: ModalService,
    
  ) {}

  @Input()persona!: Persona;
  titulo: string = 'Detalle de Personas';
  progreso: number = 0;

 

  cerrarModal(){
    this.modalService.cerrarModal();
    this.progreso = 0;
  }
}
