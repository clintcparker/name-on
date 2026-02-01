using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using name_on_core;

namespace name_on_unit_tests
{
    [TestClass]
    public class WordLengthFilterTests
    {
        private static readonly List<string> SampleWords = new List<string>
        {
            "a", "bb", "ccc", "dddd", "eeeee", "ffffff", "ggggggg", "hhhhhhhh"
        };

        [TestMethod]
        public void DefaultFilterReturnsFullList()
        {
            var filter = new WordLengthFilter(null, null);
            var result = filter.Filter(SampleWords);
            Assert.AreEqual(8, result.Count);
            CollectionAssert.AreEqual(SampleWords, result);
        }

        [TestMethod]
        public void MaxLength5FiltersCorrectly()
        {
            var filter = new WordLengthFilter(null, 5);
            var result = filter.Filter(SampleWords);
            Assert.IsTrue(result.All(w => w.Length <= 5),
                "All words should be 5 characters or fewer");
            Assert.AreEqual(5, result.Count);
        }

        [TestMethod]
        public void MinLength6FiltersCorrectly()
        {
            var filter = new WordLengthFilter(6, null);
            var result = filter.Filter(SampleWords);
            Assert.IsTrue(result.All(w => w.Length >= 6),
                "All words should be 6 characters or more");
            Assert.AreEqual(3, result.Count);
        }

        [TestMethod]
        public void MinAndMaxLengthFilterCorrectly()
        {
            var filter = new WordLengthFilter(4, 7);
            var result = filter.Filter(SampleWords);
            Assert.IsTrue(result.All(w => w.Length >= 4 && w.Length <= 7),
                "All words should be between 4 and 7 characters");
            Assert.AreEqual(4, result.Count);
        }

        [TestMethod]
        public void IsPoolTooSmallReturnsTrueWhenUnder20()
        {
            var filter = new WordLengthFilter(null, null);
            var smallList = Enumerable.Range(0, 19).Select(i => $"word{i}").ToList();
            Assert.IsTrue(filter.IsPoolTooSmall(smallList));
        }

        [TestMethod]
        public void IsPoolTooSmallReturnsFalseWhenAtOrOver20()
        {
            var filter = new WordLengthFilter(null, null);
            var enoughList = Enumerable.Range(0, 20).Select(i => $"word{i}").ToList();
            Assert.IsFalse(filter.IsPoolTooSmall(enoughList));
        }

        [TestMethod]
        public void GenWithWordFilterProducesFilteredWords()
        {
            var namer = new Namer();
            var filter = new WordLengthFilter(4, 7);
            var options = new NameOptions(wordFilter: filter);
            for (int i = 0; i < 20; i++)
            {
                var name = namer.Gen(options);
                var parts = name.Split('-');
                // Check word parts (not the number)
                foreach (var part in parts)
                {
                    if (int.TryParse(part, out _))
                        continue;
                    Assert.IsTrue(part.Length >= 4 && part.Length <= 7,
                        $"Word '{part}' in '{name}' should be between 4 and 7 characters");
                }
            }
        }
    }
}
