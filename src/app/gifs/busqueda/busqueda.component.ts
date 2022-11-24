import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {
  query : string= '';
  constructor(private gifsService:GifsService) { }

  ngOnInit(): void {
  }

  search(){
    this.gifsService.buscarGifs(this.query)
    this.query=''
  }

}
