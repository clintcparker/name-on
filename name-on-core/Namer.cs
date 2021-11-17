using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace name_on_core
{
    public class Namer
    {
        private static Namer Instance = new Namer();

        private string _lastReturn;

        // Make sure 
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
            return Gen("-",ElementType.Adjective,ElementType.Noun,ElementType.ThreeDigit);
        }
        public string Gen(params ElementType[] types)
        {
            return Gen("-",types);
        }
        public string Gen(string separator, params ElementType[] types)
        {
            var retVal = String.Join(separator,types.Select(x=>MapElementTypeToString(x)));
            while (_lastReturn == retVal)
            {
                retVal = Instance.GenRandomString();
            }
            _lastReturn = retVal;
            return _lastReturn;
        }

   public string MapElementTypeToString(ElementType et) => et switch
    {
        ElementType.Noun    => GenRandomNoun(),
        ElementType.Adjective => GenRandomAdjective(),
        ElementType.ThreeDigit  => GenRandomThreeDigits(),
        _ => throw new ArgumentOutOfRangeException(nameof(et), $"Not expected element type value: {et}"),
    };


        private string GenRandomString()
        {
            return $"{GenRandomAdjective()}-{GenRandomNoun()}-{GenRandomThreeDigits()}";
        }

        // TODO: keep the Random Instance as as private 
        private string GenRandomThreeDigits()
        {
            return _random.Next(0,999).ToString();
        }

        private string GenRandomNoun()
        {
            return Nouns[_random.Next(0,Nouns.Count-1)];
        }

        private string GenRandomAdjective()
        {
            return Adjectives[_random.Next(0,Adjectives.Count-1)];
        }

        private static List<string> Adjectives;
        private static List<string> Nouns;
    }
    public enum ElementType{
        Noun,
        Adjective,
        ThreeDigit
    }

}
