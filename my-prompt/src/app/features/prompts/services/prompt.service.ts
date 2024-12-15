import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prompt, PromptRequest } from '../models/prompt.model';
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

  getPrompt(id: string): Observable<Prompt> {
    return this.http.get<Prompt>(`${this.apiUrl}/${id}`);
  }

  createPrompt(data: PromptRequest): Observable<string> {
    return this.http.post<string>(this.apiUrl, data);
  }

  updatePrompt(id: string, data: PromptRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }
}
