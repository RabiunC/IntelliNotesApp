import { Component, ElementRef, Input, AfterViewInit, Renderer2, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-note-card',
    templateUrl: './note-card.component.html',
    styleUrls: ['./note-card.component.scss'],
    standalone: false
})
export class NoteCardComponent implements AfterViewInit {

  @ViewChild('truncator')
  truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText')
  bodyText!: ElementRef<HTMLElement>;

  @ViewChild('noteP', { static: true })
  noteP!: ElementRef<HTMLElement>;

  @Input() link: any;
  @Input() title: any;
  @Input() body: any;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    //let style = window.getComputedStyle(this.bodyText.nativeElement,null);
    //let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.noteP.nativeElement.scrollHeight > this.bodyText.nativeElement.clientHeight){
      //If there is text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    else{
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick(){
    this.deleteEvent.emit();
  }

}
