using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mis321_pa4_casherman3_new.api.models;

namespace mis321_pa4_casherman3_new.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        // GET: api/Exercises
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Exercises/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Exercises
        [HttpPost]
        public void Post([FromBody] Exercise value)
        {
            System.Console.WriteLine(value.activity_type);
        }

        // PUT: api/Exercises/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Exercises/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            System.Console.WriteLine(id);
        }
    }
}
