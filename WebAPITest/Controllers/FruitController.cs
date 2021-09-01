using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPITest.Models;
using WebAPITest.Service;

namespace WebAPITest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    [ResponseCache(VaryByHeader = "User-Agent", Duration = 120, Location = ResponseCacheLocation.Client)]
    public class FruitController : ControllerBase
    {

        private readonly IFruitService _service;

        public FruitController(IFruitService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetFruits());
        }

        [HttpGet, Route("getFruitByName/{name}")]
        public async Task<IActionResult> GetFruitByName(string name)
        {
            return Ok(await _service.GetFruitByName(name));
        }
    }


}
