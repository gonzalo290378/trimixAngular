import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor() { }

  modal: boolean = false;
  notificarUpload = new EventEmitter<any>();

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
}
