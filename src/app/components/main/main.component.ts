import { Component } from '@angular/core';
import { SelectDayComponent } from '../select-day/select-day.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SelectDayComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
