import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  url:string = "http://localhost:5050/";

  constructor(private http: HttpClient) { }

  getAllnotes(){
    return this.http.get(this.url+"data");
  }

  getNotebyId(id: any){
    return this.http.get(this.url+"data"+id);
  }

  addnote(note: any){
    return this.http.post(this.url+"add", note);
  }

  deletenote(id: any){
    return this.http.delete(this.url+"delete/"+id);
  }

  editnote(id: any){
    return this.http.get(this.url+"edit/"+id);
  }

  updatenote(id: any,note:any){
    return this.http.put(this.url+"edit/"+note._id, note);
  }
}
