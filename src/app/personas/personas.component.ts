import { Component } from '@angular/core';
import { PersonaService } from '../services/persona-service.service';
import { ModalService } from '../services/modal.service';
import { Persona } from '../interfaces/persona.interface';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert2';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent {
  constructor(
    private modalService: ModalService,
    private personaService: PersonaService
  ) {}

  personas: Persona[] = [];
  personaSeleccionada!: Persona;

  ngOnInit(): void {
    this.personaService
      .getPersonas()
      .pipe(
        tap((personas: Persona[]) => {
          this.personas = personas;
        })
      )
      .subscribe();

    this.modalService.notificarUpload.subscribe((persona) => {
      this.personas = this.personas.map((personaOriginal) => {
        if (personaOriginal.perId === persona.id) {
        }
        return personaOriginal;
      });
    });
  }

  delete(persona: Persona): void {
    this.personaService.delete(persona.perId).subscribe((personaEliminada) => {
      swal
        .fire({
          title: `Estas seguro de eliminar la persona ${persona.perNombre} ${persona.perApellido}?`,
          text: 'No podras deshacer esta opcion',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminarlo',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.personas = this.personas.filter(
              (personaFiltrada) => personaFiltrada !== persona
            );
            swal.fire(
              'Eliminada!',
              `La persona ${persona.perNombre} ${persona.perApellido} ha sido eliminado`,
              'success'
            );
          }
        });
    });
  }

  abrirModal(persona: Persona) {
    this.personaSeleccionada = persona;
    this.modalService.abrirModal();
  }
}
