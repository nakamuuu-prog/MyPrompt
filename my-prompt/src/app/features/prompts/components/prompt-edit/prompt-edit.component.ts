import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { Prompt } from '../../models/prompt.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-prompt-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './prompt-edit.component.html',
  styleUrl: './prompt-edit.component.scss',
})
export class PromptEditComponent {
  private fb = inject(FormBuilder);
  private promptService = inject(PromptService);
  private router = inject(Router);

  error = signal<string | null>(null);
  prompt = signal<Prompt | null>(null);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    category: ['', [Validators.required, Validators.maxLength(50)]],
    content: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.error.set(null);

      const data = this.form.getRawValue() as Prompt;

      this.promptService.createPrompt(data).subscribe({
        next: (prompt) => this.router.navigate(['/prompt', prompt.id]),
        error: (error: HttpErrorResponse) => {
          this.error.set('プロンプトの登録中にエラーが発生しました');
          console.error('Error creating prompt:', error);
        },
      });
    }
  }
}
