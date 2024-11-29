import { Component, inject, OnInit } from '@angular/core';
import { PromptService } from '../../services/prompt.service';
import { Prompt } from '../../models/prompt.model';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './prompt-list.component.html',
  styleUrl: './prompt-list.component.scss',
})
export class PromptListComponent implements OnInit {
  private promptService = inject(PromptService);
  promptsColumns: string[] = ['position', 'name', 'weight'];
  prompts!: MatTableDataSource<Prompt, MatPaginator>;

  isLoading = false;
  error: string | null = null;

  ngOnInit() {
    this.loadPrompts();
  }

  loadPrompts() {
    this.isLoading = true;
    this.error = null;

    this.promptService.getPrompts().subscribe({
      next: (prompts: Prompt[]) => {
        this.prompts = new MatTableDataSource(prompts);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'プロンプト取得中にエラーが発生しました。';
        this.isLoading = false;
        console.error('Error loading propmpts:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prompts.filter = filterValue.trim().toLowerCase();
  }
}
