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
    }
}
