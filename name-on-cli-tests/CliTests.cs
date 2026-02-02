using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using name_on_cli;
using name_on_core;

namespace name_on_cli_tests
{
    [TestClass]
    public class CliOptionsParseTests
    {
        [TestMethod]
        public void NoArgsReturnsDefaults()
        {
            var opts = CliOptions.Parse(Array.Empty<string>());
            Assert.AreEqual(1, opts.Count);
            Assert.AreEqual("-", opts.Separator);
            Assert.AreEqual("adj-noun-num", opts.Format);
            Assert.IsFalse(opts.ShowHelp);
            Assert.IsFalse(opts.ShowVersion);
            Assert.IsNull(opts.CompletionShell);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void ShortCountOption()
        {
            var opts = CliOptions.Parse(new[] { "-n", "5" });
            Assert.AreEqual(5, opts.Count);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void LongCountOption()
        {
            var opts = CliOptions.Parse(new[] { "--count", "10" });
            Assert.AreEqual(10, opts.Count);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void CountMissingValueReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "-n" });
            Assert.IsNotNull(opts.Error);
            Assert.IsTrue(opts.Error.Contains("--count"));
        }

        [TestMethod]
        public void CountZeroReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "-n", "0" });
            Assert.IsNotNull(opts.Error);
        }

        [TestMethod]
        public void CountNegativeReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "-n", "-1" });
            Assert.IsNotNull(opts.Error);
        }

        [TestMethod]
        public void CountNonNumericReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "-n", "abc" });
            Assert.IsNotNull(opts.Error);
        }

        [TestMethod]
        public void ShortSeparatorOption()
        {
            var opts = CliOptions.Parse(new[] { "-s", "_" });
            Assert.AreEqual("_", opts.Separator);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void LongSeparatorOption()
        {
            var opts = CliOptions.Parse(new[] { "--separator", "." });
            Assert.AreEqual(".", opts.Separator);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void SeparatorMissingValueReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "-s" });
            Assert.IsNotNull(opts.Error);
            Assert.IsTrue(opts.Error.Contains("--separator"));
        }

        [TestMethod]
        public void ShortFormatOption()
        {
            var opts = CliOptions.Parse(new[] { "-f", "adj-noun" });
            Assert.AreEqual("adj-noun", opts.Format);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void LongFormatOption()
        {
            var opts = CliOptions.Parse(new[] { "--format", "noun-num" });
            Assert.AreEqual("noun-num", opts.Format);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void FormatMissingValueReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "-f" });
            Assert.IsNotNull(opts.Error);
            Assert.IsTrue(opts.Error.Contains("--format"));
        }

        [TestMethod]
        public void ShortHelpFlag()
        {
            var opts = CliOptions.Parse(new[] { "-h" });
            Assert.IsTrue(opts.ShowHelp);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void LongHelpFlag()
        {
            var opts = CliOptions.Parse(new[] { "--help" });
            Assert.IsTrue(opts.ShowHelp);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void ShortVersionFlag()
        {
            var opts = CliOptions.Parse(new[] { "-v" });
            Assert.IsTrue(opts.ShowVersion);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void LongVersionFlag()
        {
            var opts = CliOptions.Parse(new[] { "--version" });
            Assert.IsTrue(opts.ShowVersion);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void CompletionsBash()
        {
            var opts = CliOptions.Parse(new[] { "completions", "bash" });
            Assert.AreEqual("bash", opts.CompletionShell);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void CompletionsZsh()
        {
            var opts = CliOptions.Parse(new[] { "completions", "zsh" });
            Assert.AreEqual("zsh", opts.CompletionShell);
        }

        [TestMethod]
        public void CompletionsFish()
        {
            var opts = CliOptions.Parse(new[] { "completions", "fish" });
            Assert.AreEqual("fish", opts.CompletionShell);
        }

        [TestMethod]
        public void CompletionsPowerShell()
        {
            var opts = CliOptions.Parse(new[] { "completions", "powershell" });
            Assert.AreEqual("powershell", opts.CompletionShell);
        }

        [TestMethod]
        public void CompletionsMissingShellReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "completions" });
            Assert.IsNotNull(opts.Error);
            Assert.IsTrue(opts.Error.Contains("completions"));
        }

        [TestMethod]
        public void CompletionsUnknownShellReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "completions", "tcsh" });
            Assert.IsNotNull(opts.Error);
            Assert.IsTrue(opts.Error.Contains("tcsh"));
        }

        [TestMethod]
        public void UnknownOptionReturnsError()
        {
            var opts = CliOptions.Parse(new[] { "--bogus" });
            Assert.IsNotNull(opts.Error);
            Assert.IsTrue(opts.Error.Contains("--bogus"));
        }

        [TestMethod]
        public void MultipleOptionsCompose()
        {
            var opts = CliOptions.Parse(new[] { "-n", "3", "-s", "_", "-f", "noun-adj" });
            Assert.AreEqual(3, opts.Count);
            Assert.AreEqual("_", opts.Separator);
            Assert.AreEqual("noun-adj", opts.Format);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void HelpStopsParsingEarly()
        {
            var opts = CliOptions.Parse(new[] { "-n", "5", "--help", "--bogus" });
            Assert.IsTrue(opts.ShowHelp);
            Assert.IsNull(opts.Error);
        }

        [TestMethod]
        public void VersionStopsParsingEarly()
        {
            var opts = CliOptions.Parse(new[] { "--version", "--bogus" });
            Assert.IsTrue(opts.ShowVersion);
            Assert.IsNull(opts.Error);
        }
    }

    [TestClass]
    public class FormatParserTests
    {
        [TestMethod]
        public void DefaultFormatParsesToThreeElements()
        {
            var result = FormatParser.Parse("adj-noun-num");
            CollectionAssert.AreEqual(
                new[] { ElementType.Adjective, ElementType.Noun, ElementType.Number },
                result);
        }

        [TestMethod]
        public void AdjNounFormat()
        {
            var result = FormatParser.Parse("adj-noun");
            CollectionAssert.AreEqual(
                new[] { ElementType.Adjective, ElementType.Noun },
                result);
        }

        [TestMethod]
        public void NounNumFormat()
        {
            var result = FormatParser.Parse("noun-num");
            CollectionAssert.AreEqual(
                new[] { ElementType.Noun, ElementType.Number },
                result);
        }

        [TestMethod]
        public void ReversedOrder()
        {
            var result = FormatParser.Parse("noun-adj-num");
            CollectionAssert.AreEqual(
                new[] { ElementType.Noun, ElementType.Adjective, ElementType.Number },
                result);
        }

        [TestMethod]
        public void SingleElement()
        {
            var result = FormatParser.Parse("noun");
            CollectionAssert.AreEqual(new[] { ElementType.Noun }, result);
        }

        [TestMethod]
        public void LongFormNames()
        {
            var result = FormatParser.Parse("adjective-noun-number");
            CollectionAssert.AreEqual(
                new[] { ElementType.Adjective, ElementType.Noun, ElementType.Number },
                result);
        }

        [TestMethod]
        public void DuplicateElements()
        {
            var result = FormatParser.Parse("noun-noun-num");
            CollectionAssert.AreEqual(
                new[] { ElementType.Noun, ElementType.Noun, ElementType.Number },
                result);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void InvalidPartThrows()
        {
            FormatParser.Parse("adj-invalid-num");
        }

        [TestMethod]
        public void CaseInsensitive()
        {
            var result = FormatParser.Parse("ADJ-Noun-NUM");
            CollectionAssert.AreEqual(
                new[] { ElementType.Adjective, ElementType.Noun, ElementType.Number },
                result);
        }
    }
}
