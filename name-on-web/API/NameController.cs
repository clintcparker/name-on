using Microsoft.AspNetCore.Mvc;
using name_on_core;

namespace name_on_web.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class NameController : ControllerBase
    {

        private readonly static Namer namer;

        public string Name {get;private set;}

        public NameController()
        {
            
        }       

        static NameController()
        {
            namer = new Namer();
        }

        [HttpGet]
        public string Get(){
            return namer.Gen();
        }
    }
}
