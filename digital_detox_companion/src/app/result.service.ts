import { Injectable } from '@angular/core';

// To keep interfaces explicit
export interface ActionResult {
  result: string;
  detail?: any;
}

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class ResultService {
  private _lastResult: ActionResult | null = null;

  // PUBLIC_INTERFACE
  setResult(actionResult: ActionResult) {
    this._lastResult = actionResult;
  }

  // PUBLIC_INTERFACE
  getResult(): ActionResult | null {
    const result = this._lastResult;
    this._lastResult = null; // "consume" once
    return result;
  }
}
