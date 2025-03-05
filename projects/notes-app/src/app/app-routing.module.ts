import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

const routes: Routes = 
      [ 
        { path: 'dashboard', component: NotesListComponent},
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
        { path: 'new', component: NoteDetailsComponent },
        { path: ':id', component: NoteDetailsComponent },
      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
