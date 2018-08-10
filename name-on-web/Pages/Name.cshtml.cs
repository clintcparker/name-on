using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using name_on_core;

namespace name_on_web.Pages
{
    public class NameModel : PageModel
    {
        private readonly static Namer namer;

        public string Name {get;private set;}

        static NameModel()
        {
            namer = new Namer();
        }

        public void OnGet()
        {
            Name = namer.Gen();
        }
    }
}
