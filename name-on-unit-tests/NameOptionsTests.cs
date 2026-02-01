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
    }
}
