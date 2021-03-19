using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

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
            // var retVal = "Test-one-123";
            var retVal = Instance.GenRandomString();
            while (_lastReturn == retVal)
            {
                retVal = Instance.GenRandomString();
            }
            _lastReturn = retVal;
            return _lastReturn;
        }
         
        
        private string GenRandomString()
        {
            return $"{GenRandomAdjective()}-{GenRandomNoun()}-{GenRandomThreeDigits()}";
        }

        // TODO: keep the Random Instance as as private 
        private int GenRandomThreeDigits()
        {
            return _random.Next(0,999);
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
}
