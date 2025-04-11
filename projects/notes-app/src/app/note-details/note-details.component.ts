import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note.model';
import { NotesService } from '../shared/notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-note-details',
    templateUrl: './note-details.component.html',
    styleUrls: ['./note-details.component.scss'],
    standalone: false
})
export class NoteDetailsComponent implements OnInit {
  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}
  
  note: any;
  noteId: any;
  myForm: any;
  new: boolean = true;

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file
  //files: File[] = [];

  newInfo: any = {
    _id: '',
    title: '',
    subject: '',
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

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();
  
      formData.append('file', this.file, this.file.name);
      //[...this.files].forEach((file) => {
        //formData.append("file", file, file.name);
      //});
  
      const upload$ = this.http.post("http://localhost:5050/notes/upload", formData) 
      this.status = 'uploading';
      console.log(this.status);

      upload$.subscribe({
        next: () => {
          this.status = 'success';
          console.log(this.status);
        },
        error: (error: any) => {
          this.status = 'fail';
          console.log(this.status);
          return throwError(() => error);
        },
      });
    }
  }

  clickHandler(form: any, event: any) {
    //console.log(this.newInfo._id)
    if(!this.newInfo._id){
      this.notesService.addNote(this.newInfo.title, this.newInfo.subject, this.newInfo.body).subscribe((res) => {
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
