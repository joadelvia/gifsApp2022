import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsSearchResponse } from '../interfaces/searchResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _history: string[]=[];
  private api_key: string = 'jc97OEt33W0eXvGQ9OxkdxT2F8WDnzXq';
  private url: string = 'https://api.giphy.com/v1/gifs/search';
  results: Gif[] = [];

  constructor(private http: HttpClient) { 
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
  }

  get history():string[]{
    return [...this._history];
  }

  buscarGifs(query:string):void{
    let clean = query.trim().toLowerCase();
    if (clean!=='' && !this._history.includes(clean)){
      this._history.unshift(query);
      this._history = this._history.splice(0,10)

      localStorage.setItem('history', JSON.stringify(this._history));

    }
    const params = new HttpParams()
    .set('api_key',this.api_key)
    .set('q',query)
    .set('limit',10)
    // OJO LO SIGUIENTE NO ESTABLECE UN PARÁMETRO NUEVO, DEVUELVE UN NUEVO OBJETVO
    // HTTPPARAMS CON EL ATRIBUTO3 AÑADIDO
    // params.set('atributo3',3)

    this.http.get<GifsSearchResponse>(this.url, {params})
    .subscribe((resp)=> this.results = resp.data
    )
    
  }

  
}
