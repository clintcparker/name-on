using System;
using System.Linq;

namespace name_on_core
{
    public enum JoiningStyle
    {
        Dash,
        Underscore,
        None,
        CamelCase,
        PascalCase
    }

    public static class JoiningStyleHelper
    {
        public static string Join(JoiningStyle style, string[] parts)
        {
            return style switch
            {
                JoiningStyle.Dash => string.Join("-", parts),
                JoiningStyle.Underscore => string.Join("_", parts),
                JoiningStyle.None => string.Concat(parts),
                JoiningStyle.CamelCase => JoinCamelCase(parts),
                JoiningStyle.PascalCase => JoinPascalCase(parts),
                _ => throw new ArgumentOutOfRangeException(nameof(style))
            };
        }

        private static bool IsNumeric(string s) =>
            s.Length > 0 && s.All(char.IsDigit);

        private static string Capitalize(string s) =>
            s.Length == 0 ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);

        private static string JoinCamelCase(string[] parts)
        {
            if (parts.Length == 0) return string.Empty;
            var result = parts[0].ToLowerInvariant();
            for (int i = 1; i < parts.Length; i++)
            {
                result += IsNumeric(parts[i]) ? parts[i] : Capitalize(parts[i]);
            }
            return result;
        }

        private static string JoinPascalCase(string[] parts)
        {
            if (parts.Length == 0) return string.Empty;
            var result = string.Empty;
            for (int i = 0; i < parts.Length; i++)
            {
                result += IsNumeric(parts[i]) ? parts[i] : Capitalize(parts[i]);
            }
            return result;
        }
    }
}
