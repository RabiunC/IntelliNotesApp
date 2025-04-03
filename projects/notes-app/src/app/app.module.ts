import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NotesService } from './notes.service';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';

import { customInterceptor } from './custom.interceptor';
import { jwtInterceptor } from './jwt.interceptor';
import { tokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [NotesService, UserService,
  provideHttpClient(withInterceptors([customInterceptor, tokenInterceptor]))  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
