import { Component } from '@angular/core';
import { PersonaService } from '../services/persona-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from "sweetalert2";
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Persona } from '../interfaces/persona.interface';
import { TipoDocumento } from '../interfaces/tipo-documento.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  numberPattern: string ="^[0-9]*$";
  tipoDocumentos!: TipoDocumento[];
  persona: Persona = {} as Persona;
  titulo: string = "Crear Persona"
  
  constructor(
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,

  ){
    this.dateAdapter.setLocale('es-AR');
  }

  miFormulario: FormGroup = this.formBuilder.group({
    perNombre: [, [Validators.required, Validators.minLength(3)]],
    perApellido: [, [Validators.required, Validators.minLength(3)]],
    perNumeroDocumento: [, [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(7)]],
    tipoDocumento: [, [Validators.required]],
    perFechaNacimiento: [, [Validators.required]],

  })


  campoNoValido(campo: string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  
  ngOnInit(): void {
    this.cargarPersona();
    this.personaService.getTipoDocumentos()
      .subscribe(tipoDocumentos => {
        this.tipoDocumentos = tipoDocumentos;
      });
  }

  

  create(): void{
    this.persona = this.miFormulario.value;
    this.personaService.create(this.persona)
      .subscribe(respuesta => {
        this.router.navigate(['/personas']);
        swal.fire('Nueva Persona', `Persona ${respuesta.perNombre} creada con exito`, 'success');

      })

  }

  cargarPersona() : void {
    this.activatedRoute.paramMap
      .subscribe(params =>{
        if(params.get('id')){
          this.personaService.getPersona(Number(params.get('id')))
            .subscribe( persona => {
              this.persona = persona;
              this.miFormulario.controls['perNombre'].setValue(this.persona.perNombre);  
              this.miFormulario.controls['perApellido'].setValue(this.persona.perApellido);              
              this.miFormulario.controls['perNumeroDocumento'].setValue(this.persona.perNumeroDocumento);              
              this.miFormulario.controls['tipoDocumento'].setValue(this.persona.tipoDocumento.tipo);   
              this.miFormulario.controls['perFechaNacimiento'].setValue(this.persona.perFechaNacimiento);   

            });
        }
        
      })
  }

  update():void{
    this.personaService.update(this.miFormulario.value, this.persona.perId)
      .subscribe(nuevaPersona => {
        this.router.navigate(['/personas']);
        swal.fire('Persona Actualizada' ,`Persona ${nuevaPersona.perNombre} actualizada con exito`, 'success');
      })
  } 

  compararTipoDocumento(t1: TipoDocumento, t2: TipoDocumento): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
