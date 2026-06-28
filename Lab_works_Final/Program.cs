using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// --------------------------------------------
// Настройка отдачи статических файлов
// --------------------------------------------
app.UseDefaultFiles();     // автоматически ищет index.html, default.html, etc.
app.UseStaticFiles();      // отдаёт файлы из папки wwwroot

app.Run();