import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-detox-modes',
  templateUrl: './detox-modes.component.html',
  styleUrl: './detox-modes.component.css',
  imports: [CommonModule],
})
export class DetoxModesComponent { }
