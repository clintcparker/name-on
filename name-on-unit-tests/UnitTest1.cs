using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using name_on_core;
using System.Linq;
using System.Reflection;
using System;

namespace name_on_unit_tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void ConsecutiveGeneratedNamesAreUnique()
        {
            var Namer = new name_on_core.Namer();
            var name1 = Namer.Gen();
            var name2 = Namer.Gen();
            Assert.AreNotEqual(name1,name2);
        }
        
        [TestMethod]
        public void NamesAreStringDashStringDashNumber()
        {
            var Namer = new name_on_core.Namer();
            var name1 = Namer.Gen();
            var pattern = @"^[a-zA-Z]+-[a-zA-Z]+-\d+$";
            var r= new Regex(pattern);
            Assert.IsTrue(r.IsMatch(name1), $"Wrong Pattern: {name1} doesn't match {pattern}");
        }

        [TestMethod]
        public void NamesAreVeryUnique()
        {
            var n = new name_on_core.Namer();
            var max = 1000000;
            var d = new Dictionary<string,int>();
            for (var i = 0;i<max;i++){
                var name = n.Gen();
                try {
                    d.Add(name,0);
                }catch(System.ArgumentException){
                    Debug.WriteLine(name);
                }
            }
        }

        [TestMethod]
        public void NoWeirdCharactersInDictionaries()
        {
            var dicts = new name_on_core.Dicts();
            var pattern = @"\w+";
            var r = new Regex(pattern);
            bool adjectivesAreGood = dicts.Adjectives.TrueForAll(r.IsMatch);
            bool nounsAreGood = dicts.Nouns.TrueForAll(r.IsMatch);
            Assert.IsTrue(adjectivesAreGood&&nounsAreGood, listBadValues(dicts,r));
        }

        private string listBadValues(Dicts dicts, Regex r)
        {
            var allWords = new List<string>();
            var type1 = dicts.GetType();
            var allFields = type1.GetFields(BindingFlags.Instance | BindingFlags.NonPublic);
            var fields = allFields.Where(fi => fi.FieldType == typeof(List<string>));
            foreach (var field in fields){
                List<string> list = field.GetValue(dicts) as List<string>;
                allWords.AddRange(list);
            }
            var s1 = string.Join(",", allWords.FindAll(x=>!r.IsMatch(x)));
            return $" BAD VALUES: \n\n\n {s1}  \n\n\n\n";
        }

        [TestMethod]
        public void AdjectiveNounNoun()
        {
            var n = new name_on_core.Namer();
            var name = n.Gen(ElementType.Adjective,ElementType.Noun,ElementType.Noun);
            Debug.WriteLine(name);
            Assert.IsTrue(true);
        }

        [TestMethod]
        public void GenNoArgsProducesBackwardCompatibleFormat()
        {
            var namer = new name_on_core.Namer();
            var name = namer.Gen();
            var pattern = @"^[a-zA-Z]+-[a-zA-Z]+-\d+$";
            var r = new Regex(pattern);
            Assert.IsTrue(r.IsMatch(name),
                $"Backward compat: '{name}' doesn't match {pattern}");
        }

        [TestMethod]
        public void AdjectivesAndNounsArePubliclyAccessible()
        {
            // Verify that Adjectives and Nouns are public static properties/fields
            Assert.IsNotNull(Namer.Adjectives, "Adjectives should be publicly accessible");
            Assert.IsNotNull(Namer.Nouns, "Nouns should be publicly accessible");
            Assert.IsTrue(Namer.Adjectives.Count > 0, "Adjectives list should not be empty");
            Assert.IsTrue(Namer.Nouns.Count > 0, "Nouns list should not be empty");
        }

    }
}
