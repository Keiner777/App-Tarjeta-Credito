import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCretido';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {

  titulo = 'Agregar Tarjeta';
  loading= false;
  form: FormGroup;
  id:string | undefined;

  constructor(private fb: FormBuilder,
              private Tarjeta_Service: TarjetaService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numero_tarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16) ]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5) ]],
      cvv: ['', [Validators.required, Validators.required, Validators.minLength(3), Validators.maxLength(3) ]],
    })
   }

  ngOnInit(): void {
 
    this.Tarjeta_Service.getTarjetaEdit().subscribe(data =>{
      this.id = data.id
      this.titulo= 'Editar Tarjeta';
      this.form.patchValue({
        titular: data.titular,
        numero_tarjeta: data.numero_tarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv,

      })
    })
  }


  GuardarTarjeta(){
    

    if(this.id === undefined){
      // creamos una nueva tarjeta 
      this.agregarTarjeta();


    }else{
      // editamos una tarjeta 
      this.editarTarjeta(this.id);

    }
   

    
    

  }



  agregarTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numero_tarjeta: this.form.value.numero_tarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }

    this.loading = true;
    this.Tarjeta_Service.GuadarTarjeta(TARJETA).then(()=>{
      
      this.loading = false;
      console.log('tarjeta registrado');
      this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta registrada');
      this.form.reset();
    }, error => {
      this.loading = false;
      this.toastr.error('Opps.. ocurrio un error', 'Error');
      console.log(error);
    })
  }


  editarTarjeta(id: string){

    const TARJETA: any= {
      titular: this.form.value.titular,
      numero_tarjeta: this.form.value.numero_tarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date(),
    }
    this.loading = true;
    this.Tarjeta_Service.editarTarjeta(id, TARJETA).then(()=>{
      this.loading = false;
      this.titulo = 'Agregar Tarjeta';
      this.form.reset();
      this.id = undefined;
      this.toastr.info('La tarjeta fue actualizada con exito!', 'Tarjeta registrada')
    }, error=>{
      console.log(error);
    })
  }

  





}
