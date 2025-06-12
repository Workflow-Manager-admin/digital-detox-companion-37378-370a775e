import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-community-circles',
  templateUrl: './community-circles.component.html',
  styleUrl: './community-circles.component.css',
  imports: [CommonModule],
})
export class CommunityCirclesComponent { }
