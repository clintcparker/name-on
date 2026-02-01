using System;
using System.Collections.Generic;
using System.Linq;

namespace name_on_core
{
    public class Namer
    {
        private string _lastReturn;

        private static Random _random;

        static Namer()
        {
            var d = new Dicts();
            Adjectives = d.Adjectives;
            Nouns = d.Nouns;
            _random = new Random();
        }

        public string Gen()
        {
            return Gen(NameOptions.Default);
        }

        public string Gen(params ElementType[] types)
        {
            return Gen("-", types);
        }

        public string Gen(string separator, params ElementType[] types)
        {
            var retVal = String.Join(separator, types.Select(x => MapElementTypeToString(x)));
            while (_lastReturn == retVal)
            {
                retVal = Gen(NameOptions.Default);
            }
            _lastReturn = retVal;
            return _lastReturn;
        }

        public string Gen(NameOptions options)
        {
            var filteredAdjectives = options.WordFilter.Filter(Adjectives);
            var filteredNouns = options.WordFilter.Filter(Nouns);

            var parts = GenerateParts(options, filteredAdjectives, filteredNouns);
            var retVal = JoiningStyleHelper.Join(options.JoiningStyle, parts);

            while (_lastReturn == retVal)
            {
                parts = GenerateParts(options, filteredAdjectives, filteredNouns);
                retVal = JoiningStyleHelper.Join(options.JoiningStyle, parts);
            }
            _lastReturn = retVal;
            return _lastReturn;
        }

        private string[] GenerateParts(NameOptions options, List<string> adjectives, List<string> nouns)
        {
            return options.Template.Elements.Select(et => et switch
            {
                ElementType.Adjective => adjectives[_random.Next(0, adjectives.Count)],
                ElementType.Noun => nouns[_random.Next(0, nouns.Count)],
                ElementType.Number => options.NumberConfig.Format(
                    _random.Next(0, options.NumberConfig.MaxValue + 1)),
                _ => throw new ArgumentOutOfRangeException(nameof(et),
                    $"Not expected element type value: {et}")
            }).ToArray();
        }

        public string MapElementTypeToString(ElementType et) => et switch
        {
            ElementType.Noun => GenRandomNoun(),
            ElementType.Adjective => GenRandomAdjective(),
            ElementType.Number => GenRandomThreeDigits(),
            _ => throw new ArgumentOutOfRangeException(nameof(et),
                $"Not expected element type value: {et}"),
        };

        private string GenRandomString()
        {
            return $"{GenRandomAdjective()}-{GenRandomNoun()}-{GenRandomThreeDigits()}";
        }

        private string GenRandomThreeDigits()
        {
            return _random.Next(0, 1000).ToString();
        }

        private string GenRandomNoun()
        {
            return Nouns[_random.Next(0, Nouns.Count)];
        }

        private string GenRandomAdjective()
        {
            return Adjectives[_random.Next(0, Adjectives.Count)];
        }

        internal static List<string> Adjectives;
        internal static List<string> Nouns;
    }

    public enum ElementType
    {
        Noun,
        Adjective,
        Number
    }
}
