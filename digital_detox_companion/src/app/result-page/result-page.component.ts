import { Component, OnInit } from '@angular/core';
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
export class ResultPageComponent implements OnInit {
  result: string | null = null;
  detail: any = null;

  constructor() {}

  ngOnInit() {
    // Since ResultService is not injected, just display default "No action performed yet."
    this.result = 'No action performed yet.';
    this.detail = null;
  }
}
