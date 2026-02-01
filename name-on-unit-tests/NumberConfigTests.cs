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
    }
}
