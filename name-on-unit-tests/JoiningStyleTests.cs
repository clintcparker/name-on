using Microsoft.VisualStudio.TestTools.UnitTesting;
using name_on_core;

namespace name_on_unit_tests
{
    [TestClass]
    public class JoiningStyleTests
    {
        [TestMethod]
        public void DashJoinsWithDash()
        {
            var parts = new[] { "clever", "otter", "42" };
            var result = JoiningStyleHelper.Join(JoiningStyle.Dash, parts);
            Assert.AreEqual("clever-otter-42", result);
        }

        [TestMethod]
        public void UnderscoreJoinsWithUnderscore()
        {
            var parts = new[] { "clever", "otter", "42" };
            var result = JoiningStyleHelper.Join(JoiningStyle.Underscore, parts);
            Assert.AreEqual("clever_otter_42", result);
        }

        [TestMethod]
        public void NoneJoinsWithNoCasingChange()
        {
            var parts = new[] { "clever", "otter", "42" };
            var result = JoiningStyleHelper.Join(JoiningStyle.None, parts);
            Assert.AreEqual("cleverotter42", result);
        }

        [TestMethod]
        public void CamelCaseJoinsCorrectly()
        {
            var parts = new[] { "clever", "otter", "42" };
            var result = JoiningStyleHelper.Join(JoiningStyle.CamelCase, parts);
            Assert.AreEqual("cleverOtter42", result);
        }

        [TestMethod]
        public void PascalCaseJoinsCorrectly()
        {
            var parts = new[] { "clever", "otter", "42" };
            var result = JoiningStyleHelper.Join(JoiningStyle.PascalCase, parts);
            Assert.AreEqual("CleverOtter42", result);
        }

        [TestMethod]
        public void CamelCaseWithNounNumberTwoParts()
        {
            var parts = new[] { "otter", "42" };
            var result = JoiningStyleHelper.Join(JoiningStyle.CamelCase, parts);
            Assert.AreEqual("otter42", result);
        }

        [TestMethod]
        public void PascalCaseWithNounNumberTwoParts()
        {
            var parts = new[] { "otter", "42" };
            var result = JoiningStyleHelper.Join(JoiningStyle.PascalCase, parts);
            Assert.AreEqual("Otter42", result);
        }
    }
}
