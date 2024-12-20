import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { Prompt, PromptRequest } from '../../models/prompt.model';
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
export class PromptEditComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private promptService = inject(PromptService);

  isNew = signal(false);
  promptId = signal<string | null>(null);
  prompt = signal<Prompt | null>(null);
  error = signal<string | null>(null);
  isLoading = signal(false);

  private fb = inject(FormBuilder);
  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    category: ['', [Validators.required, Validators.maxLength(50)]],
    content: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.router.url === '/prompt/new') {
      this.isNew.set(true);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('プロンプト取得中にエラーが発生しました。');
      console.error('idが取得できませんでした。');
      return;
    }

    this.promptId.set(id);
    this.loadPrompt(id);
  }

  private loadPrompt(id: string) {
    this.isLoading.set(true);
    this.error.set(null);

    this.promptService.getPrompt(id).subscribe({
      next: (prompt) => {
        this.form.patchValue({
          title: prompt.title,
          category: prompt.category,
          content: prompt.content,
        });
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.error.set('プロンプト取得中にエラーが発生しました。');
        this.isLoading.set(false);
        console.error('Error loading prompt:', error);
      },
    });
  }

  onSubmit() {
    if (!this.form.valid) return;

    this.isLoading.set(true);
    this.error.set(null);

    const data = this.form.getRawValue() as PromptRequest;

    if (this.isNew()) {
      this.promptService.createPrompt(data).subscribe({
        next: (id) => {
          this.isLoading.set(false);
          this.router.navigate(['/prompt', id]);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading.set(false);
          this.error.set('プロンプトの登録中にエラーが発生しました');
          console.error('Error creating prompt:', error);
        },
      });
    } else {
      this.promptService.updatePrompt(this.promptId()!, data).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/prompt', this.promptId()]);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading.set(false);
          this.error.set('プロンプトの更新中にエラーが発生しました');
          console.error('Error updating prompt:', error);
        },
      });
    }
  }

  cancel() {
    if (this.isNew()) {
      this.router.navigate(['/prompts/list']);
    } else {
      this.router.navigate(['/prompt', this.promptId()]);
    }
  }
}
