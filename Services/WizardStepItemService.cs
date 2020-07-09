using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WizardLayout.Common.Interfaces;
using WizardLayout.Common.Interfaces.Services;
using WizardLayout.Model;

namespace WizardLayout.Services
{
    public class WizardStepItemService : IWizardStepItemService
    {
        protected IWizardStepItemRepository _wizardStepItemRepository { get; }
        protected IWizardStepRepository _wizardStepRepository { get; }

        public WizardStepItemService(IWizardStepItemRepository wizardStepItemRepository, IWizardStepRepository wizardStepRepository)
        {
            _wizardStepItemRepository = wizardStepItemRepository;
            _wizardStepRepository = wizardStepRepository;
        }

        public async Task<WizardStepItem> CreateStepItem(int stepId, WizardStepItem wizardStepItem)
        {
            var step = await _wizardStepRepository.Get(stepId);
            if (step == null)
                throw new InvalidOperationException($"Step with id : {stepId} not found to create a new item!");

            wizardStepItem.Step = step;
            return await _wizardStepItemRepository.Add(wizardStepItem);
        }

        public Task<WizardStepItem> DeleteStepItem(int stepItemId) => _wizardStepItemRepository.Delete(stepItemId);

        public Task<WizardStepItem> GetStepItem(int stepItemId) => _wizardStepItemRepository.Get(stepItemId);

        public Task<WizardStepItem> UpdateStepItem(int stepItemId, WizardStepItem stepItem) => _wizardStepItemRepository.Update(stepItemId, stepItem);
    }
}
