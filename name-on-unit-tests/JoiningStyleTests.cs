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
    }
}
