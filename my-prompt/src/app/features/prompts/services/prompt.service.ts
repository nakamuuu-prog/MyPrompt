import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prompt } from '../models/prompt.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private readonly apiUrl = `${environment.apiUrl}/prompts`;

  private http = inject(HttpClient);

  getPrompts(): Observable<Prompt[]> {
    return this.http.get<Prompt[]>(this.apiUrl);
  }
}
