using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WizardLayout.Common.Interfaces.Services;
using WizardLayout.Model;

namespace WizardLayout.Controllers
{
    [Route("api/[controller]")]
    public class WizardStepController : BaseController
    {
        protected IWizardStepService _wizardStepService { get; }
        protected IMapper _mapper { get; }
        public WizardStepController(IWizardStepService wizardStepService, IMapper mapper)
        {
            _wizardStepService = wizardStepService;
            _mapper = mapper;
        }

        // GET: api/WizardStep
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var steps = await _wizardStepService.GetSteps(null, null);
                var stepsDto = _mapper.Map<List<ViewStepDto>>(steps);
                return Ok(stepsDto);
            }
            catch (Exception e)
            {
                return Problem(detail: "An error happend during loading steps operation , try again later !", statusCode: 500);
            }

        }

        // GET: api/WizardStep/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var step = await _wizardStepService.GetStep(id);
                var stepDto = _mapper.Map<ViewStepDto>(step);
                return Ok(stepDto);
            }
            catch (Exception e)
            {
                return Problem(detail: $"An error happend during step get operation , step with id : {id} , try again later !", statusCode: 500);
            }
        }

        // POST: api/WizardStep
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateStepDto createStepDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var createdStep = await _wizardStepService.CreateStep(_mapper.Map<WizardStep>(createStepDto));
                var createdStepDto = _mapper.Map<ViewStepDto>(createdStep);
                return Ok(createdStepDto);
            }
            catch (Exception e)
            {
                return Problem(detail: $"An error happend during step create operation , try again later !", statusCode: 500);
            }
        }


        // DELETE: api/WizardStep/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deletedStep = await _wizardStepService.DeleteStep(id);
                var deletedStepDto = _mapper.Map<ViewStepDto>(deletedStep);
                return Ok(deletedStepDto);
            }
            catch (Exception e)
            {
                return Problem(detail: $"An error happend during step delete operation , try again later !", statusCode: 500);
            }
        }
    }
}
