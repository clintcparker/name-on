using System;
using name_on_core;
using System.IO;
using System.Linq;

namespace name_on_cli
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = new Namer();
            foreach (var arg in args){
                //Console.WriteLine(arg);
                try {
                    Console.WriteLine($"{arg}\ttype:{ArgMapper(arg).ToString()}");
                } catch(ArgumentOutOfRangeException e){
                    Console.WriteLine($"{arg}\ttype:unknown");
                }
            }
            ElementType[] ets;
            try {
                ets = args.Select(x=>ArgMapper(x)).ToArray();
                Console.WriteLine(n.Gen(ets));
            }catch (ArgumentOutOfRangeException e)
            {
                Console.Error.WriteLine(e.Message);
            }
        }

        public static ElementType ArgMapper(string s) => s switch
        {
            "n"  => ElementType.Noun,
            "a"  => ElementType.Adjective,
            "3"  => ElementType.ThreeDigit,
            _ => throw new ArgumentOutOfRangeException(nameof(s), $"Not expected element type value: {s}"),
        };
    }
}

