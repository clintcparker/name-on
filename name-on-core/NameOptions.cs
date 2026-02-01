namespace name_on_core
{
    public class NameOptions
    {
        public FormatTemplate Template { get; }
        public JoiningStyle JoiningStyle { get; }
        public NumberConfig NumberConfig { get; }
        public WordLengthFilter WordFilter { get; }

        public NameOptions(
            FormatTemplate template = null,
            JoiningStyle joiningStyle = JoiningStyle.Dash,
            NumberConfig numberConfig = null,
            WordLengthFilter wordFilter = null)
        {
            Template = template ?? FormatTemplate.Default;
            JoiningStyle = joiningStyle;
            NumberConfig = numberConfig ?? NumberConfig.Default;
            WordFilter = wordFilter ?? WordLengthFilter.Default;
        }

        public static NameOptions Default { get; } = new NameOptions();
    }
}
