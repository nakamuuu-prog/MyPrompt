using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPrompt.Data;
using MyPrompt.Models;
using MyPrompt.Models.Request;

namespace MyPrompt.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PromptsController : ControllerBase
{
  private readonly PromptsDbContext _context;

  public PromptsController(PromptsDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Prompt>>> GetPrompts()
  {
    try
    {
      var prompts = await _context.Prompts.OrderByDescending(p => p.UpdatedAt).ToListAsync();
      return Ok(prompts);
    }
    catch
    {
      return StatusCode(500, "プロンプト一覧取得中にエラーが発生しました。");
    }
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Prompt>> GetPrompt(Guid id)
  {
    try
    {
      var prompt = await _context.Prompts.FindAsync(id);

      if (prompt == null) return NotFound($"ID: {id} のプロンプトは見つかりませんでした。");

      return Ok(prompt);
    }
    catch
    {
      return StatusCode(500, "プロンプト取得中にエラーが発生しました。");
    }
  }

  [HttpPost]
  public async Task<IActionResult> CreatePrompt(PromptRequest request)
  {
    try
    {
      var prompt = new Prompt
      {
        Id = Guid.NewGuid(),
        Title = request.Title,
        Content = request.Content,
        Category = request.Category,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow,
      };

      _context.Prompts.Add(prompt);
      await _context.SaveChangesAsync();

      return Ok(prompt.Id);
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "プロンプト登録中にエラーが発生しました。");
    }
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdatePrompt(Guid id, PromptRequest request)
  {
    try
    {
      var prompt = await _context.Prompts.FindAsync(id);
      if (prompt == null) return NotFound();

      prompt.Title = request.Title;
      prompt.Category = request.Category;
      prompt.Content = request.Content;
      prompt.UpdatedAt = DateTime.UtcNow;

      await _context.SaveChangesAsync();

      return Ok();
    }
    catch
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "プロンプト更新中にエラーが発生しました。");
    }
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeletePropmt(Guid id)
  {
    try
    {
      var prompt = await _context.Prompts.FindAsync(id);
      if (prompt == null) return NotFound();

      _context.Remove(prompt);

      await _context.SaveChangesAsync();

      return Ok();
    }
    catch (System.Exception)
    {
      return StatusCode(StatusCodes.Status500InternalServerError, "プロンプト削除中にエラーが発生しました。");
    }
  }
}
