import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-family-dashboard',
  templateUrl: './family-dashboard.component.html',
  styleUrl: './family-dashboard.component.css',
  imports: [CommonModule],
})
export class FamilyDashboardComponent { }
