using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
    public class FeaturesController
    {
        private readonly VegaDbContext _vegaDbContext;
        private readonly IMapper _mapper;

        public FeaturesController(VegaDbContext vegaDbContext,IMapper mapper)
        {
            _vegaDbContext = vegaDbContext;
            _mapper = mapper;
        }
        [HttpGet("/api/features")]
        public async Task<IEnumerable<FeatureResource>> GetFeatures()
        {
            var features = await _vegaDbContext.Features.ToListAsync();
            return Mapper.Map<List<Feature>, List<FeatureResource>>(features);
        }
    }
}