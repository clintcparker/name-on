using System.Collections.Generic;
using System.Linq;

namespace name_on_core
{
    public class WordLengthFilter
    {
        public int? MinLength { get; }
        public int? MaxLength { get; }
        public const int MinPoolSize = 20;

        public WordLengthFilter(int? minLength, int? maxLength)
        {
            MinLength = minLength;
            MaxLength = maxLength;
        }

        public List<string> Filter(List<string> words)
        {
            if (MinLength == null && MaxLength == null)
                return words;

            return words.Where(w =>
                (MinLength == null || w.Length >= MinLength.Value) &&
                (MaxLength == null || w.Length <= MaxLength.Value))
                .ToList();
        }

        public bool IsPoolTooSmall(List<string> filtered)
        {
            return filtered.Count < MinPoolSize;
        }

        public static WordLengthFilter Default { get; } = new WordLengthFilter(null, null);
    }
}
