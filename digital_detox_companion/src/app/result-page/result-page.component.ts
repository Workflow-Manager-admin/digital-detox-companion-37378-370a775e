import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResultService, ActionResult } from '../result.service';

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

  constructor(private resultService: ResultService) {}

  ngOnInit() {
    const res: ActionResult | null = this.resultService.getResult();
    if (res) {
      this.result = res.result;
      this.detail = res.detail || null;
    } else {
      this.result = 'No action performed yet.';
      this.detail = null;
    }
  }
}
