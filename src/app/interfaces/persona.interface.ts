import { TipoDocumento } from "./tipo-documento.interface";

export interface Persona{
    perId: number;
    perNombre: string;
    perApellido: string;
    perNumeroDocumento: number;
    tipoDocumento: TipoDocumento;
    perFechaNacimiento: Date;
}