import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_PROMPTS, Prompt } from '../models/prompt.model';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  getPrompts(): Observable<Prompt[]> {
    return of(MOCK_PROMPTS);
  }
}
