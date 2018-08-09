using System;
using name_on_core;
using System.IO;

namespace name_on_cli
{
    class Program
    {
        static void Main(string[] args)
        {
            var d = System.IO.File.ReadLines("Adjectives.txt");
            var n = new Namer();
            Console.WriteLine(n.Gen());
        }
    }
}
