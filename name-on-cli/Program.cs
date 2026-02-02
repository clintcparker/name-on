using System;
using System.Linq;
using System.Reflection;
using name_on_core;

namespace name_on_cli
{
    public class CliOptions
    {
        public int Count { get; set; } = 1;
        public string Separator { get; set; } = "-";
        public string Format { get; set; } = "adj-noun-num";
        public bool ShowHelp { get; set; }
        public bool ShowVersion { get; set; }
        public string CompletionShell { get; set; }
        public string Error { get; set; }

        public static CliOptions Parse(string[] args)
        {
            var options = new CliOptions();

            for (int i = 0; i < args.Length; i++)
            {
                switch (args[i])
                {
                    case "-h":
                    case "--help":
                        options.ShowHelp = true;
                        return options;

                    case "-v":
                    case "--version":
                        options.ShowVersion = true;
                        return options;

                    case "-n":
                    case "--count":
                        if (i + 1 >= args.Length || !int.TryParse(args[i + 1], out var count) || count < 1)
                        {
                            options.Error = "Error: --count requires a positive integer";
                            return options;
                        }
                        i++;
                        options.Count = count;
                        break;

                    case "-s":
                    case "--separator":
                        if (i + 1 >= args.Length)
                        {
                            options.Error = "Error: --separator requires a value";
                            return options;
                        }
                        i++;
                        options.Separator = args[i];
                        break;

                    case "-f":
                    case "--format":
                        if (i + 1 >= args.Length)
                        {
                            options.Error = "Error: --format requires a value (e.g., adj-noun-num)";
                            return options;
                        }
                        i++;
                        options.Format = args[i];
                        break;

                    case "completions":
                        if (i + 1 >= args.Length)
                        {
                            options.Error = "Error: completions requires a shell name (bash, zsh, fish, powershell)";
                            return options;
                        }
                        i++;
                        var shell = args[i].ToLowerInvariant();
                        if (shell != "bash" && shell != "zsh" && shell != "fish" && shell != "powershell")
                        {
                            options.Error = $"Error: Unknown shell '{args[i]}'. Supported: bash, zsh, fish, powershell";
                            return options;
                        }
                        options.CompletionShell = shell;
                        return options;

                    default:
                        options.Error = $"Error: Unknown option '{args[i]}'. Use --help for usage.";
                        return options;
                }
            }

            return options;
        }
    }

    public static class FormatParser
    {
        public static ElementType[] Parse(string format)
        {
            var parts = format.Split('-');
            return parts.Select(MapPart).ToArray();
        }

        public static ElementType MapPart(string part)
        {
            return part.ToLowerInvariant() switch
            {
                "adj" or "adjective" => ElementType.Adjective,
                "noun" => ElementType.Noun,
                "num" or "number" => ElementType.Number,
                _ => throw new ArgumentException($"Unknown format part: '{part}'. Use: adj, noun, num")
            };
        }
    }

    public class Program
    {
        public static int Main(string[] args)
        {
            var options = CliOptions.Parse(args);

            if (options.Error != null)
            {
                Console.Error.WriteLine(options.Error);
                Console.Error.WriteLine("Run 'name-on --help' for usage information.");
                return 1;
            }

            if (options.ShowHelp)
            {
                PrintHelp();
                return 0;
            }

            if (options.ShowVersion)
            {
                PrintVersion();
                return 0;
            }

            if (options.CompletionShell != null)
            {
                return PrintCompletions(options.CompletionShell);
            }

            ElementType[] format;
            try
            {
                format = FormatParser.Parse(options.Format);
            }
            catch (ArgumentException ex)
            {
                Console.Error.WriteLine(ex.Message);
                return 1;
            }

            var namer = new Namer();
            for (int i = 0; i < options.Count; i++)
            {
                Console.WriteLine(namer.Gen(options.Separator, format));
            }

            return 0;
        }

        private static void PrintVersion()
        {
            var version = Assembly.GetExecutingAssembly()
                .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
                ?.InformationalVersion ?? "unknown";
            // Strip build metadata suffix if present (e.g., "1.0.0+abc123")
            var plusIndex = version.IndexOf('+');
            if (plusIndex >= 0) version = version.Substring(0, plusIndex);
            Console.WriteLine($"name-on {version}");
        }

        private static void PrintHelp()
        {
            Console.WriteLine(@"name-on - Generate unique, human-readable names

Usage: name-on [options]
       name-on completions <shell>

Options:
  -n, --count <N>        Generate N names (default: 1)
  -s, --separator <SEP>  Separator between parts (default: -)
  -f, --format <FORMAT>  Name format using: adj, noun, num (default: adj-noun-num)
  -v, --version          Show version
  -h, --help             Show this help

Completions:
  name-on completions bash        Output bash completions
  name-on completions zsh         Output zsh completions
  name-on completions fish        Output fish completions
  name-on completions powershell  Output PowerShell completions

Examples:
  name-on                         Generate a name:  clever-otter-123
  name-on -n 5                    Generate 5 names
  name-on -s _                    Use underscore:   clever_otter_123
  name-on -f adj-noun             No number:        clever-otter
  name-on -f noun-adj-num         Reorder:          otter-clever-123

Install:
  .NET Tool:  dotnet tool install -g name-on
  Homebrew:   brew install clintcparker/tap/name-on
  Script:     curl -fsSL https://name-on.clintcparker.com/install.sh | sh");
        }

        private static int PrintCompletions(string shell)
        {
            switch (shell)
            {
                case "bash":
                    Console.WriteLine(BashCompletions);
                    return 0;
                case "zsh":
                    Console.WriteLine(ZshCompletions);
                    return 0;
                case "fish":
                    Console.WriteLine(FishCompletions);
                    return 0;
                case "powershell":
                    Console.WriteLine(PowerShellCompletions);
                    return 0;
                default:
                    Console.Error.WriteLine($"Unknown shell: {shell}");
                    return 1;
            }
        }

        private const string BashCompletions = @"_name_on_completions() {
    local cur prev
    COMPREPLY=()
    cur=""${COMP_WORDS[COMP_CWORD]}""
    prev=""${COMP_WORDS[COMP_CWORD-1]}""

    case ""${prev}"" in
        -f|--format)
            COMPREPLY=( $(compgen -W ""adj-noun-num adj-noun noun-num adj-num noun-adj-num"" -- ""${cur}"") )
            return 0
            ;;
        -n|--count)
            return 0
            ;;
        -s|--separator)
            COMPREPLY=( $(compgen -W ""- _ . :"" -- ""${cur}"") )
            return 0
            ;;
        completions)
            COMPREPLY=( $(compgen -W ""bash zsh fish powershell"" -- ""${cur}"") )
            return 0
            ;;
    esac

    COMPREPLY=( $(compgen -W ""-n --count -s --separator -f --format -v --version -h --help completions"" -- ""${cur}"") )
}
complete -F _name_on_completions name-on";

        private const string ZshCompletions = @"#compdef name-on

_name-on() {
    local -a options
    options=(
        '-n[Generate N names]:count:'
        '--count[Generate N names]:count:'
        '-s[Separator between parts]:separator:(- _ . :)'
        '--separator[Separator between parts]:separator:(- _ . :)'
        '-f[Name format]:format:(adj-noun-num adj-noun noun-num adj-num noun-adj-num)'
        '--format[Name format]:format:(adj-noun-num adj-noun noun-num adj-num noun-adj-num)'
        '-v[Show version]'
        '--version[Show version]'
        '-h[Show help]'
        '--help[Show help]'
        '1:command:(completions)'
    )

    _arguments -s $options

    case ""$words[2]"" in
        completions)
            _values 'shell' bash zsh fish powershell
            ;;
    esac
}

_name-on ""$@""";

        private const string FishCompletions = @"complete -c name-on -s n -l count -d 'Generate N names' -x
complete -c name-on -s s -l separator -d 'Separator between parts' -x -a '- _ . :'
complete -c name-on -s f -l format -d 'Name format' -x -a 'adj-noun-num adj-noun noun-num adj-num noun-adj-num'
complete -c name-on -s v -l version -d 'Show version'
complete -c name-on -s h -l help -d 'Show help'
complete -c name-on -n '__fish_use_subcommand' -a completions -d 'Generate shell completions'
complete -c name-on -n '__fish_seen_subcommand_from completions' -x -a 'bash zsh fish powershell'";

        private const string PowerShellCompletions = @"Register-ArgumentCompleter -Native -CommandName name-on -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)

    $tokens = $commandAst.ToString() -split '\s+'

    # Complete shell names after 'completions'
    if ($tokens -contains 'completions') {
        @('bash', 'zsh', 'fish', 'powershell') |
            Where-Object { $_ -like ""$wordToComplete*"" } |
            ForEach-Object { [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_) }
        return
    }

    # Complete format values after -f/--format
    $lastToken = if ($tokens.Count -gt 1) { $tokens[-2] } else { '' }
    if ($lastToken -eq '-f' -or $lastToken -eq '--format') {
        @('adj-noun-num', 'adj-noun', 'noun-num', 'adj-num', 'noun-adj-num') |
            Where-Object { $_ -like ""$wordToComplete*"" } |
            ForEach-Object { [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_) }
        return
    }

    # Complete separator values after -s/--separator
    if ($lastToken -eq '-s' -or $lastToken -eq '--separator') {
        @('-', '_', '.', ':') |
            Where-Object { $_ -like ""$wordToComplete*"" } |
            ForEach-Object { [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_) }
        return
    }

    # Default: complete options
    @(
        [System.Management.Automation.CompletionResult]::new('-n', '-n', 'ParameterName', 'Generate N names')
        [System.Management.Automation.CompletionResult]::new('--count', '--count', 'ParameterName', 'Generate N names')
        [System.Management.Automation.CompletionResult]::new('-s', '-s', 'ParameterName', 'Separator between parts')
        [System.Management.Automation.CompletionResult]::new('--separator', '--separator', 'ParameterName', 'Separator between parts')
        [System.Management.Automation.CompletionResult]::new('-f', '-f', 'ParameterName', 'Name format')
        [System.Management.Automation.CompletionResult]::new('--format', '--format', 'ParameterName', 'Name format')
        [System.Management.Automation.CompletionResult]::new('-v', '-v', 'ParameterName', 'Show version')
        [System.Management.Automation.CompletionResult]::new('--version', '--version', 'ParameterName', 'Show version')
        [System.Management.Automation.CompletionResult]::new('-h', '-h', 'ParameterName', 'Show help')
        [System.Management.Automation.CompletionResult]::new('--help', '--help', 'ParameterName', 'Show help')
        [System.Management.Automation.CompletionResult]::new('completions', 'completions', 'Command', 'Generate shell completions')
    ) | Where-Object { $_.CompletionText -like ""$wordToComplete*"" }
}";
    }
}
