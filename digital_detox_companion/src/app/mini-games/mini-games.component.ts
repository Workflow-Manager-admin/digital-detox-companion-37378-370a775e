import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-mini-games',
  templateUrl: './mini-games.component.html',
  styleUrl: './mini-games.component.css',
  imports: [CommonModule],
})
export class MiniGamesComponent { }
