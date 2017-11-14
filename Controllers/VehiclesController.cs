using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
    [Route("/api/Vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly VegaDbContext _vegaDbContext;

        public VehiclesController(IMapper mapper,VegaDbContext vegaDbContext)
        {
            _mapper = mapper;
            _vegaDbContext = vegaDbContext;
        }
        // GET
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            /*ANGULAR ILE FORMDAN GELECEGI ICIN EKLEMEYE GEREK YOK
             *
             * var model = await _vegaDbContext.Models.FindAsync(vehicleResource.ModelId);
            if (model is null)
            {
                ModelState.AddModelError("ModelId","Invalid modelId");
                return BadRequest(ModelState);
            }*/
                
            
            var vehicle = _mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;
            _vegaDbContext.Vehicles.Add(vehicle);
            await _vegaDbContext.SaveChangesAsync();

            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }
        
        [HttpPut("{id}")] //api
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _vegaDbContext.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id); 
                
            _mapper.Map<VehicleResource, Vehicle>(vehicleResource,vehicle);
            vehicle.LastUpdate = DateTime.Now;
            
            await _vegaDbContext.SaveChangesAsync();

            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }
    }
}