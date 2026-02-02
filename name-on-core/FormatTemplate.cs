using System.Collections.Generic;
using System.Linq;

namespace name_on_core
{
    public class FormatTemplate
    {
        public string Id { get; }
        public string Label { get; }
        public ElementType[] Elements { get; }
        public bool HasNumber => Elements.Contains(ElementType.Number);

        public FormatTemplate(string id, string label, ElementType[] elements)
        {
            Id = id;
            Label = label;
            Elements = elements;
        }

        public static FormatTemplate AdjectiveNounNumber { get; } = new FormatTemplate(
            "adjective-noun-number",
            "Adjective-Noun-Number",
            new[] { ElementType.Adjective, ElementType.Noun, ElementType.Number });

        public static FormatTemplate Default { get; } = AdjectiveNounNumber;

        public static FormatTemplate AdjectiveNoun { get; } = new FormatTemplate(
            "adjective-noun",
            "Adjective-Noun",
            new[] { ElementType.Adjective, ElementType.Noun });

        public static FormatTemplate NounAdjectiveNumber { get; } = new FormatTemplate(
            "noun-adjective-number",
            "Noun-Adjective-Number",
            new[] { ElementType.Noun, ElementType.Adjective, ElementType.Number });

        public static FormatTemplate AdjectiveAdjectiveNoun { get; } = new FormatTemplate(
            "adjective-adjective-noun",
            "Adjective-Adjective-Noun",
            new[] { ElementType.Adjective, ElementType.Adjective, ElementType.Noun });

        public static FormatTemplate NounNumber { get; } = new FormatTemplate(
            "noun-number",
            "Noun-Number",
            new[] { ElementType.Noun, ElementType.Number });

        public static IReadOnlyList<FormatTemplate> All { get; } = new List<FormatTemplate>
        {
            AdjectiveNounNumber,
            AdjectiveNoun,
            NounAdjectiveNumber,
            AdjectiveAdjectiveNoun,
            NounNumber
        };
    }
}
