using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WizardLayout.Common.Interfaces;
using WizardLayout.Common.Interfaces.Services;
using WizardLayout.Model;

namespace WizardLayout.Services
{
    public class WizardStepService : IWizardStepService
    {
        protected IWizardStepRepository _wizardStepRepository { get; }
        public WizardStepService(IWizardStepRepository wizardStepRepository)
        {
            _wizardStepRepository = wizardStepRepository;
        }

        public Task<WizardStep> CreateStep(WizardStep wizardStep) => _wizardStepRepository.Add(wizardStep);
        public Task<WizardStep> DeleteStep(int stepId) => _wizardStepRepository.Delete(stepId);
        public Task<WizardStep> GetStep(int stepId) => _wizardStepRepository.Get(stepId);
        public Task<List<WizardStep>> GetSteps(int? pageIndex, int? pageSize) => _wizardStepRepository.GetAll(pageIndex, pageSize);

    }
}
