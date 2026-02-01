using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using name_on_core;

namespace name_on_unit_tests
{
    [TestClass]
    public class FormatTemplateTests
    {
        [TestMethod]
        public void DefaultTemplateHasAdjectiveNounNumber()
        {
            var template = FormatTemplate.Default;
            CollectionAssert.AreEqual(
                new[] { ElementType.Adjective, ElementType.Noun, ElementType.Number },
                template.Elements);
        }

        [TestMethod]
        public void AllFiveTemplatesExistWithCorrectElements()
        {
            CollectionAssert.AreEqual(
                new[] { ElementType.Adjective, ElementType.Noun, ElementType.Number },
                FormatTemplate.AdjectiveNounNumber.Elements);

            CollectionAssert.AreEqual(
                new[] { ElementType.Adjective, ElementType.Noun },
                FormatTemplate.AdjectiveNoun.Elements);

            CollectionAssert.AreEqual(
                new[] { ElementType.Noun, ElementType.Adjective, ElementType.Number },
                FormatTemplate.NounAdjectiveNumber.Elements);

            CollectionAssert.AreEqual(
                new[] { ElementType.Adjective, ElementType.Adjective, ElementType.Noun },
                FormatTemplate.AdjectiveAdjectiveNoun.Elements);

            CollectionAssert.AreEqual(
                new[] { ElementType.Noun, ElementType.Number },
                FormatTemplate.NounNumber.Elements);
        }

        [TestMethod]
        public void AllPropertyContainsFiveTemplates()
        {
            Assert.AreEqual(5, FormatTemplate.All.Count);
        }

        [TestMethod]
        public void HasNumberReturnsTrueForTemplatesWithNumber()
        {
            Assert.IsTrue(FormatTemplate.AdjectiveNounNumber.HasNumber);
            Assert.IsTrue(FormatTemplate.NounAdjectiveNumber.HasNumber);
            Assert.IsTrue(FormatTemplate.NounNumber.HasNumber);
        }

        [TestMethod]
        public void HasNumberReturnsFalseForTemplatesWithoutNumber()
        {
            Assert.IsFalse(FormatTemplate.AdjectiveNoun.HasNumber);
            Assert.IsFalse(FormatTemplate.AdjectiveAdjectiveNoun.HasNumber);
        }
    }
}
