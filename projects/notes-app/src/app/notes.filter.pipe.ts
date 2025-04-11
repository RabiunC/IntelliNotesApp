import { Pipe, PipeTransform } from '@angular/core';
import { NotesService } from './shared/notes.service';

@Pipe({
  name: 'notesFilter',
  standalone: false,
})
export class NotesFilterPipe implements PipeTransform {

  constructor(private notesService: NotesService) {}

  transform(list: any, args: any = '') {
    if (args.length < 0) {
      return list;

    } else {
      return list.filter((note: any) =>
        note.title.toLowerCase().includes(args.toLowerCase())
      );
    }
  }
}
