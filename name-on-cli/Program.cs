using System;
using name_on_core;
using System.IO;

namespace name_on_cli
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = new Namer();
            Console.WriteLine(n.Gen());
        }
    }
}

