using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPrompt.Data;
using MyPrompt.Models;

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
}