using System;

namespace name_on_core
{
    public class NumberConfig
    {
        public int MaxValue { get; }
        public bool ZeroPad { get; }
        public int PadWidth => MaxValue switch
        {
            <= 9 => 1,
            <= 99 => 2,
            <= 999 => 3,
            <= 9999 => 4,
            _ => MaxValue.ToString().Length
        };

        public NumberConfig(int maxValue = 999, bool zeroPad = false)
        {
            MaxValue = maxValue;
            ZeroPad = zeroPad;
        }

        public string Format(int n)
        {
            return ZeroPad ? n.ToString().PadLeft(PadWidth, '0') : n.ToString();
        }

        public static NumberConfig Default { get; } = new NumberConfig();
    }
}
