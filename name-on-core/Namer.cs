using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace name_on_core
{
    public class Namer
    {
        private static Namer Instance = new Namer();

        private string lastReturn;


        
        static Namer()
        {
            Adjectives = File.ReadLines("Adjectives.txt").ToList();
            Nouns = File.ReadLines("Nouns.txt").ToList();
        }

        public string Gen()
        {
            // var retVal = "Test-one-123";
            var retVal = Instance.GenRandomString();
            while (lastReturn == retVal)
            {
                retVal = Instance.GenRandomString();
            }
            lastReturn = retVal;
            return lastReturn;
        }

        private string GenRandomString()
        {
            return $"{GenRandomAdjective()}-{GenRandomNoun()}-{GenRandomThreeDigits()}";
        }

        private int GenRandomThreeDigits()
        {
            var r = new Random();
            return r.Next(0,999);
        }

        private string GenRandomNoun()
        {
            var r = new Random();
            return Nouns[r.Next(0,Nouns.Count-1)];
        }

        private string GenRandomAdjective()
        {
            var r = new Random();
            return Adjectives[r.Next(0,Adjectives.Count-1)];
        }

        private static List<string> Adjectives;
        private static List<string> Nouns;
    }
}
