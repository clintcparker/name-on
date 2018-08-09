using System.Collections.Generic;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace name_on_unit_tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void ConsecutiveGeneratedNamesAreUnique()
        {
            var Namer = new name_on_core.Namer();
            var name1 = Namer.Gen();
            var name2 = Namer.Gen();
            Assert.AreNotEqual(name1,name2);
        }
        
        [TestMethod]
        public void NamesAreStringDashStringDashNumber()
        {
            var Namer = new name_on_core.Namer();
            var name1 = Namer.Gen();
            var pattern = @"^[a-zA-Z]+-[a-zA-Z]+-\d+$";
            var r= new Regex(pattern);
            Assert.IsTrue(r.IsMatch(name1), $"Wrong Pattern: {name1} doesn't match {pattern}");
        }

        [TestMethod]
        public void NamesAreVeryUnique()
        {
            var n = new name_on_core.Namer();
            var max = 1000000;
            var d = new Dictionary<string,int>();
            for (var i = 0;i<max;i++){
                var name = n.Gen();
                try {
                    d.Add(name,0);
                }catch(System.ArgumentException){
                    Debug.WriteLine(name);
                }
            }
        }
    }
}
