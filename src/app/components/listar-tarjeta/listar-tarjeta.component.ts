import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCretido';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  listTarjetasModels: TarjetaCredito[] = [];
  constructor(private Tarjeta_Service: TarjetaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.MostrarTarjetas_list();
  }

 MostrarTarjetas_list(){


    this.Tarjeta_Service.MostrarTarjeta().subscribe(doc =>{
      this.listTarjetasModels = [];
      doc.forEach((element:any) => {
        this.listTarjetasModels.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.listTarjetasModels)
    })
  }



  eliminarTarjeta(id: any) {
    this.Tarjeta_Service.EliminarTarjeta(id).then(() => {
      this.toastr.error('La Tarjeta fue eliminada con exito!','Registro Eliminado')
    }, error => {
      this.toastr.error('Opss.. ocurrio un error', 'Error');
      console.log(error);
    })
  }


  editarTarjeta(tarjeta: TarjetaCredito){

    return this.Tarjeta_Service.addTarjetaEdit(tarjeta);

  }

}
