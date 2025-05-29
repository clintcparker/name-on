using System.Net.Http;
using System.Threading.Tasks;

public class CommitHashService
{
    private readonly HttpClient _httpClient;
    public CommitHashService(HttpClient httpClient) => _httpClient = httpClient;

    public async Task<string> GetCommitHashAsync()
    {
        try
        {
            return (await _httpClient.GetStringAsync("commit.txt")).Trim();
        }
        catch
        {
            return "unknown";
        }
    }
}
