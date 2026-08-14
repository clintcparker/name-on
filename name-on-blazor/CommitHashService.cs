using System.Reflection;

public class CommitHashService
{
    public string GetCommitHash()
    {
        return typeof(CommitHashService).Assembly
            .GetCustomAttributes<AssemblyMetadataAttribute>()
            .FirstOrDefault(a => a.Key == "CommitHash")?.Value ?? "unknown";
    }
}
