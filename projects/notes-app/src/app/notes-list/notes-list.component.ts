import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Note } from '../shared/note.model';
import { NotesService } from '../shared/notes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.scss'],
    animations: [
        trigger('itemAnim', [
            transition('void => *', [
                style({
                    height: 0,
                    opacity: 0,
                    transform: 'scale(0.85)',
                    'margin-bottom': 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                }),
                animate('50ms', style({
                    height: '*',
                    'margin-bottom': '*',
                    paddingTop: '*',
                    paddingBottom: '*',
                    paddingLeft: '*',
                    paddingRight: '*',
                })),
                animate(100)
            ]),
            transition('* => void', [
                animate(50, style({
                    transform: 'scale(1.05)'
                })),
                animate(50, style({
                    transform: 'scale(1)',
                    opacity: 0.75
                })),
                animate('120ms ease-out', style({
                    transform: 'scale(0.68)',
                    opacity: 0
                })),
                animate('150ms ease-out', style({
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    'margin-bottom': '0'
                }))
            ])
        ]),
        trigger('listAnim', [
            transition('* => *', [
                query(':enter', [
                    style({
                        opacity: 0,
                        height: 0
                    }),
                    stagger(100, [
                        animate('0.2s ease')
                    ])
                ], {
                    optional: true
                })
            ])
        ])
    ],
    standalone: false
})

export class NotesListComponent implements OnInit {

  notes: any;
  filterby:any = '';
    
  constructor(private notesService: NotesService, private router: Router,  private ar:ActivatedRoute ) { }

  ngOnInit(): void {
    this.notesService.getAll().subscribe(res => {
      //console.log(res);
      this.notes = res;      
    });
    //this.filteredNotes = this.notesService.getAll();
    //this.filter('');
    this.filterby = this.ar.snapshot.queryParams['filterOn'];
  }

  deleteNote(id: any) {
    //let noteId = this.notesService.getId(note);
    //this.notesService.delete(noteId);
    this.notesService.delete(id).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('dashboard');
    })
  }
}
