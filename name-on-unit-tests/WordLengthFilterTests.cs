using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using name_on_core;

namespace name_on_unit_tests
{
    [TestClass]
    public class WordLengthFilterTests
    {
        [TestMethod]
        public void DefaultFilterReturnsFullList()
        {
            var filter = new WordLengthFilter(null, null);
            var words = new List<string> { "a", "bb", "ccc", "dddd", "eeeee" };
            var result = filter.Filter(words);
            Assert.AreEqual(5, result.Count);
            CollectionAssert.AreEqual(words, result);
        }
    }
}
