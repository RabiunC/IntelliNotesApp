import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note.model';
import { NotesService } from '../shared/notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  note: any;
  noteId: any;
  myForm: any;
  new: boolean = true;

  newInfo: any = {
    _id: '',
    title: '',
    body: ''
  };

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
    //console.log(id);

      this.notesService.getbyId(id).subscribe((res) => {
        //console.log(res);
        this.newInfo = res;
        //console.log(this.newInfo);
      })
  }

  clickHandler(form: any, event: any) {
    //console.log(this.newInfo._id)
    if(!this.newInfo._id){
      this.notesService.addNote(this.newInfo.title, this.newInfo.body).subscribe((res) => {
        console.log(res);
      })
    }
      this.notesService.updateNote(this.newInfo._id, this.newInfo).subscribe((res) => {
        console.log(res);
      })
      this.router.navigateByUrl('/dashboard');
  }

  cancel() {
    this.router.navigateByUrl('/dashboard');
  }
}
