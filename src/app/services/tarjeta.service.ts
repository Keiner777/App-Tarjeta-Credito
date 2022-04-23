import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { TarjetaCredito } from '../models/TarjetaCretido';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjeta$ = new Subject<any>();
  constructor(private firestore: AngularFirestore) { }

  GuadarTarjeta(tarjeta: TarjetaCredito){

    return this.firestore.collection('CardCredit').add(tarjeta);
  }



  MostrarTarjeta(): Observable<any>{
    return this.firestore.collection('CardCredit', ref=>ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
  }

  EliminarTarjeta(id:string): Promise<any>{

    return this.firestore.collection('CardCredit').doc(id).delete();



  }


  // editar tarjeta pasando los datos del componente listar-tarjeta a crear-tarjeta 

  addTarjetaEdit(tarjeta: TarjetaCredito){

    this.tarjeta$.next(tarjeta)
  }

  getTarjetaEdit():Observable<TarjetaCredito>{

    return this.tarjeta$.asObservable();

  }

  editarTarjeta(id: string, tarjeta:any): Promise<any>{
  
    return  this.firestore.collection('CardCredit').doc(id).update(tarjeta);
  }


}
