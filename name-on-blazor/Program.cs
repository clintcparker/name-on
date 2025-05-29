using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using name_on_blazor;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
// The App component is generated from App.razor and should be available in the global namespace
builder.RootComponents.Add<App>("#app");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<CommitHashService>();

await builder.Build().RunAsync();
