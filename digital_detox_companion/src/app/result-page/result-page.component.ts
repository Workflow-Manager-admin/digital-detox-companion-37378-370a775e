import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PUBLIC_INTERFACE
@Component({
  standalone: true,
  selector: 'app-result-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent {
  result: string | null = null;
  detail: any = null;

  constructor() {
    // In a real application, use a service or ActivatedRoute/Router for navigation state.
    // This placeholder may be replaced with logic using ResultService when integrated by feature components.
  }
}
