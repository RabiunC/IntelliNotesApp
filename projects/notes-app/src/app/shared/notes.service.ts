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
    return this.notes;
  }

  get(id: number){
    return this.notes[id];
  }

  getId(note: Note){
    return this.notes.indexOf(note);
  }

  addNote(data: any){
    //console.log(data);
    /*this.notes.push(note);
    let index = this.notes.length - 1;
    return index;*/
    return this.http.post(this.url+"add", data);
  }

  update(id: number, title: string, body: string){
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete(id:number){
    this.notes.splice(id, 1);
  }
}
