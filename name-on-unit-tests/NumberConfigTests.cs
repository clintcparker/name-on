using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using name_on_core;

namespace name_on_unit_tests
{
    [TestClass]
    public class NumberConfigTests
    {
        [TestMethod]
        public void DefaultConfigHasMax999NoPadding()
        {
            var config = NumberConfig.Default;
            Assert.AreEqual(999, config.MaxValue);
            Assert.IsFalse(config.ZeroPad);
        }

        [TestMethod]
        public void DefaultFormatReturnsPlainNumber()
        {
            var config = NumberConfig.Default;
            Assert.AreEqual("42", config.Format(42));
        }

        [TestMethod]
        public void Max99NoPadFormatReturnsPlainNumber()
        {
            var config = new NumberConfig(maxValue: 99, zeroPad: false);
            Assert.AreEqual(99, config.MaxValue);
            Assert.IsFalse(config.ZeroPad);
            Assert.AreEqual("7", config.Format(7));
        }

        [TestMethod]
        public void Max9999NoPadFormatReturnsPlainNumber()
        {
            var config = new NumberConfig(maxValue: 9999, zeroPad: false);
            Assert.AreEqual(9999, config.MaxValue);
            Assert.AreEqual("42", config.Format(42));
        }

        [TestMethod]
        public void Max999ZeroPadFormats7As007()
        {
            var config = new NumberConfig(maxValue: 999, zeroPad: true);
            Assert.AreEqual("007", config.Format(7));
        }

        [TestMethod]
        public void Max9999ZeroPadFormats42As0042()
        {
            var config = new NumberConfig(maxValue: 9999, zeroPad: true);
            Assert.AreEqual("0042", config.Format(42));
        }

        [TestMethod]
        public void Max9ZeroPadFormats5As5()
        {
            var config = new NumberConfig(maxValue: 9, zeroPad: true);
            Assert.AreEqual("5", config.Format(5));
        }

        [TestMethod]
        public void PadWidthComputedCorrectly()
        {
            Assert.AreEqual(1, new NumberConfig(maxValue: 9).PadWidth);
            Assert.AreEqual(2, new NumberConfig(maxValue: 99).PadWidth);
            Assert.AreEqual(3, new NumberConfig(maxValue: 999).PadWidth);
            Assert.AreEqual(4, new NumberConfig(maxValue: 9999).PadWidth);
        }

        [TestMethod]
        public void GenWithMax99ProducesNumberInRange()
        {
            var namer = new Namer();
            var config = new NumberConfig(maxValue: 99, zeroPad: false);
            var options = new NameOptions(numberConfig: config);
            for (int i = 0; i < 50; i++)
            {
                var name = namer.Gen(options);
                var parts = name.Split('-');
                var numberPart = parts.Last();
                Assert.IsTrue(int.TryParse(numberPart, out var num),
                    $"Could not parse number from '{numberPart}' in '{name}'");
                Assert.IsTrue(num >= 0 && num <= 99,
                    $"Number {num} out of range 0-99 in '{name}'");
            }
        }
    }
}
