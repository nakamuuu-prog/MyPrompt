import { Component, inject, OnInit, signal } from '@angular/core';
import { PromptService } from '../../services/prompt.service';
import { Prompt } from '../../models/prompt.model';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './prompt-list.component.html',
  styleUrl: './prompt-list.component.scss',
})
export class PromptListComponent implements OnInit {
  private readonly promptService = inject(PromptService);

  promptsColumns: string[] = ['title', 'category', 'updatedAt'];
  prompts!: MatTableDataSource<Prompt, MatPaginator>;

  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadPrompts();
  }

  loadPrompts() {
    this.isLoading.set(true);
    this.error.set(null);

    this.promptService.getPrompts().subscribe({
      next: (prompts: Prompt[]) => {
        this.prompts = new MatTableDataSource(prompts);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set('プロンプト一覧取得中にエラーが発生しました。');
        this.isLoading.set(false);
        console.error('Error loading propmpts:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prompts.filter = filterValue.trim().toLowerCase();
  }
}
