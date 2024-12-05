import { Routes } from '@angular/router';
import { PromptListComponent } from './features/prompts/components/prompt-list/prompt-list.component';
import { PromptDetailComponent } from './features/prompts/components/prompt-detail/prompt-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'prompts/list', pathMatch: 'full' },
  { path: 'prompts/list', component: PromptListComponent },
  { path: 'prompt/:id', component: PromptDetailComponent },
];
