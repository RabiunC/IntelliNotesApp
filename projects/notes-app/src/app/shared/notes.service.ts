import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  url:string = "http://localhost:5050/notes/";
  notes: Note[] = new Array<Note>();

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url+"data");
    //return this.notes;
  }

  getbyId(id: number){
    //return this.notes[id];
    return this.http.get(this.url+"edit/"+id);
  }

  getId(note: Note){
    return this.notes.indexOf(note);
  }

  addNote(title: any, subject:any, body: any){
    //console.log(data);
    let data = {title, subject, body}
    /*this.notes.push(note);
    let index = this.notes.length - 1;
    return index;*/
    return this.http.post(this.url+"add", data);
  }

  updateNote(id:any, data: any){
    /*let note = this.notes[id];
    note.title = title;
    note.body = body;*/
    return this.http.put(this.url+"edit/"+id, data);
  }

  delete(id:any){
    //this.notes.splice(id, 1);
    return this.http.delete(this.url+"delete/"+id);
  }
}
