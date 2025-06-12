import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-emergency-bypass',
  templateUrl: './emergency-bypass.component.html',
  styleUrl: './emergency-bypass.component.css',
  imports: [CommonModule],
})
export class EmergencyBypassComponent { }
