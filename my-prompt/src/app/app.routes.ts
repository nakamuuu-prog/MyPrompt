import { Routes } from '@angular/router';
import { PromptListComponent } from './features/prompts/components/prompt-list/prompt-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'prompts/list', pathMatch: 'full' },
  { path: 'prompts/list', component: PromptListComponent },
];
