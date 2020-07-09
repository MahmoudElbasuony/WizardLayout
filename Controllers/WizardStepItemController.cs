using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class WizardStepItemController : BaseController
    {
        protected IWizardStepItemService _wizardStepItemService { get; }
        protected IMapper _mapper { get; }

        public WizardStepItemController(IWizardStepItemService wizardStepItemService, IMapper mapper)
        {
            _wizardStepItemService = wizardStepItemService;
            _mapper = mapper;
        }

        // GET: api/WizardStepItem/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var stepItem = await _wizardStepItemService.GetStepItem(id);
                var stepItemDto = _mapper.Map<ViewStepItemDto>(stepItem);
                return Ok(stepItemDto);
            }
            catch (Exception e)
            {
                return Problem(detail: $"An error happend during step item get operation , step item with id : {id} , try again later !", statusCode: 500);
            }
        }

        // POST: api/WizardStepItem
        [HttpPost("{stepId}")]
        public async Task<IActionResult> Post(int stepId, [FromBody] CreateStepItemDto createStepItemDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var createdStepItem = await _wizardStepItemService.CreateStepItem(stepId, _mapper.Map<WizardStepItem>(createStepItemDto));
                var createdStepItemDto = _mapper.Map<ViewStepItemDto>(createdStepItem);
                return Ok(createdStepItemDto);
            }
            catch (Exception e)
            {
                return Problem(detail: $"An error happend during step item create operation , try again later !", statusCode: 500);
            }
        }

        // PUT: api/WizardStepItem/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateStepItemDto updateStepItemDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var updatedStepItem = await _wizardStepItemService.UpdateStepItem(id, _mapper.Map<WizardStepItem>(updateStepItemDto));
                var updatedStepItemDto = _mapper.Map<ViewStepItemDto>(updatedStepItem);
                return Ok(updatedStepItemDto);
            }
            catch (Exception e)
            {
                return Problem(detail: $"An error happend during step item update operation , try again later !", statusCode: 500);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deletedStepItem = await _wizardStepItemService.DeleteStepItem(id);
                var deletedStepItemDto = _mapper.Map<ViewStepItemDto>(deletedStepItem);
                return Ok(deletedStepItemDto);
            }
            catch (Exception e)
            {
                return Problem(detail: $"An error happend during step item delete operation , try again later !", statusCode: 500);
            }
        }
    }
}
