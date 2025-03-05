import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NotesService } from '../shared/notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  note: any;
  noteId: any;
  new: boolean = true;

  ngOnInit(): void {    

    this.route.params.subscribe( (params: Params) => {

      this.note = new Note();

      if(params['id']){
        this.note = this.notesService.get(params['id']);
        this.noteId = params['id'];
        this.new = false;
      }
      else{
        this.new = true;
      }
    })    
  }

  onSubmit(form: NgForm) {
    //console.log(form.value);
    if(this.new){
      this.notesService.addNote(form.value).subscribe(res => {
        console.log(res);
      });
      this.router.navigateByUrl('/');
    }
    else{
      this.notesService.update(this.noteId, form.value.title, form.value.body);
      this.router.navigateByUrl('/');
    }
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
