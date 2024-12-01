import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prompt } from '../models/prompt.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private readonly apiUrl = 'http://localhost:5115/api/prompts';

  private http = inject(HttpClient);

  getPrompts(): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(this.apiUrl);
  }
}
