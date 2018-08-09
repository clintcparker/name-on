using System;

namespace name_on_core
{
    public class Namer
    {
        public static Namer Instance = new Namer();

        private string lastReturn;

        public string Gen()
        {
            var retVal = "Test-one-123";
            if (lastReturn == retVal)
            {
                retVal = "dfghj";
            }
            lastReturn = retVal;
            return lastReturn;
        }
    }
}
