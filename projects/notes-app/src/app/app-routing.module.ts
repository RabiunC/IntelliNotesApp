import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = 
      [ 
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent},
        { path: 'dashboard', component: NotesListComponent},       
        { path: 'register', component: RegisterComponent},
        { path: 'dashboard/new', component: NoteDetailsComponent },
        { path: 'dashboard/new/:id', component: NoteDetailsComponent },
        { path: '**', component: NotFoundComponent}
      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
