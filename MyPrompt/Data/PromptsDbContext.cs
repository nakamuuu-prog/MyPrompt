using Microsoft.EntityFrameworkCore;
using MyPrompt.Models;

namespace MyPrompt.Data;

public class PromptsDbContext : DbContext
{
    public PromptsDbContext(DbContextOptions<PromptsDbContext> options) : base(options) { }

    public DbSet<Prompt> Prompts => Set<Prompt>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Prompt>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                .IsRequired()
                .ValueGeneratedOnAdd();
            entity.Property(e => e.Title)
                .IsRequired();
            entity.Property(e => e.Content)
                .IsRequired();
            entity.Property(e => e.Category)
                .IsRequired();
            entity.Property(e => e.CreatedAt)
                .IsRequired();
            entity.Property(e => e.UpdatedAt)
                .IsRequired();
        });
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=myprompt.db");
    }
}