using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using name_on_core;

namespace name_on_unit_tests
{
    [TestClass]
    public class NameOptionsTests
    {
        [TestMethod]
        public void DefaultOptionsProduceAdjectiveDashNounDashNumber()
        {
            var namer = new Namer();
            var name = namer.Gen(NameOptions.Default);
            var pattern = @"^[a-zA-Z]+-[a-zA-Z]+-\d+$";
            Assert.IsTrue(Regex.IsMatch(name, pattern),
                $"Default options produced '{name}' which doesn't match {pattern}");
        }

        [TestMethod]
        public void GenWithAdjectiveNounTemplateProducesTwoParts()
        {
            var namer = new Namer();
            var options = new NameOptions(template: FormatTemplate.AdjectiveNoun);
            var name = namer.Gen(options);
            var parts = name.Split('-');
            Assert.AreEqual(2, parts.Length,
                $"Expected 2 parts but got {parts.Length} from '{name}'");
            Assert.IsTrue(parts.All(p => p.All(char.IsLetter)),
                $"Expected all parts to be alphabetic but got '{name}'");
        }

        [TestMethod]
        public void GenWithNounAdjectiveNumberProducesCorrectOrder()
        {
            var namer = new Namer();
            var options = new NameOptions(template: FormatTemplate.NounAdjectiveNumber);
            var name = namer.Gen(options);
            var parts = name.Split('-');
            Assert.AreEqual(3, parts.Length,
                $"Expected 3 parts but got {parts.Length} from '{name}'");
            Assert.IsTrue(Namer.Nouns.Contains(parts[0]),
                $"First part '{parts[0]}' should be a valid noun");
            Assert.IsTrue(Namer.Adjectives.Contains(parts[1]),
                $"Second part '{parts[1]}' should be a valid adjective");
            Assert.IsTrue(int.TryParse(parts[2], out _),
                $"Third part '{parts[2]}' should be a number");
        }
    }
}
