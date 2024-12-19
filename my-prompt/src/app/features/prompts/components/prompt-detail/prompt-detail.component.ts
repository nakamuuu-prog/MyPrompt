import { Component, inject, OnInit, signal } from '@angular/core';
import { Prompt } from '../../models/prompt.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PromptService } from '../../services/prompt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './prompt-detail.component.html',
  styleUrl: './prompt-detail.component.scss',
})
export class PromptDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly promptService = inject(PromptService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  private readonly closeText = '閉じる';

  private snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  prompt = signal<Prompt | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('プロンプト取得中にエラーが発生しました。');
      console.error('idが取得できませんでした。');
      return;
    }

    this.loadPrompt(id);
  }

  private loadPrompt(id: string) {
    this.isLoading.set(true);
    this.error.set(null);

    this.promptService.getPrompt(id).subscribe({
      next: (prompt: Prompt) => {
        this.prompt.set(prompt);
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.error.set('プロンプト取得中にエラーが発生しました。');
        this.isLoading.set(false);
        console.error('Error loading prompt:', error);
      },
    });
  }

  copyContent() {
    const prompt = this.prompt();
    if (!prompt) {
      this.openSnackBar('コピーするプロンプトが存在しません');
      return;
    }

    navigator.clipboard
      .writeText(prompt.content)
      .then(() => {
        this.openSnackBar('コピーしました');
      })
      .catch(() => {
        this.openSnackBar('コピーに失敗しました');
      });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, this.closeText, this.snackBarConfig);
  }

  deletePrompt() {
    if (!this.prompt() || !confirm('本当に削除しますか？')) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('プロンプト削除中にエラーが発生しました。');
      console.error('idが取得できませんでした。');
      return;
    }

    this.promptService.deletePrompt(id).subscribe({
      next: () => this.router.navigate(['/prompts/list']),
      error: (error: HttpErrorResponse) => {
        this.error.set('プロンプト削除中にエラーが発生しました。');
        this.isLoading.set(false);
        console.error('Error deleting prompt:', error);
      },
    });
  }
}
