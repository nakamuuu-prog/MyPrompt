using System.ComponentModel.DataAnnotations;

namespace MyPrompt.Models.Request;

public class PromptRequest
{
  [Required(ErrorMessage = "タイトルは必須です")]
  [StringLength(100, ErrorMessage = "タイトルは100文字以内で入力してください")]
  public required string Title { get; set; }

  [Required(ErrorMessage = "内容は必須です")]
  public required string Content { get; set; }

  [Required(ErrorMessage = "カテゴリーは必須です")]
  [StringLength(50, ErrorMessage = "カテゴリーは50文字以内で入力してください")]
  public required string Category { get; set; }
}
