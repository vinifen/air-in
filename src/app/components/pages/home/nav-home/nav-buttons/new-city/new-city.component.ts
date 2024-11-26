import { Component, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { NewCitySlideContentComponent } from '../../nav-slide-content/new-city-slide-content/new-city-slide-content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-city',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-city.component.html',
  styleUrl: './new-city.component.css'
})
export class NewCityComponent {
  @Output() dynamicComponentChange = new EventEmitter<any>();
  buttonColor: string = 'transparent';  

  public onContentChange(): void { 
    this.dynamicComponentChange.emit(NewCitySlideContentComponent);
    this.buttonColor = this.buttonColor === 'transparent' ? 'white' : 'transparent';
  }
}
