import { AfterViewChecked, Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sc-new',
  standalone: true,
  imports: [],
  templateUrl: './sc-new.component.html',
  styleUrls: ['./sc-new.component.css']
})
export class ScNewComponent implements AfterViewChecked {
  @ViewChild('newInput') searchInput!: ElementRef;

  ngAfterViewChecked(): void {
    this.searchInput.nativeElement.focus();
  }
}
