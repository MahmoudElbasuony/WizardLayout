using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WizardLayout.Common.Interfaces;
using WizardLayout.Common.Interfaces.Services;
using WizardLayout.DataAccess.Repositories;
using WizardLayout.Services;

namespace WizardLayout.App_Code
{
    public class DIConfig
    {
        public static void Register(IServiceCollection services)
        {
            services.AddScoped<IWizardStepRepository, WizardStepRepository>();
            services.AddScoped<IWizardStepItemRepository, WizardStepItemRepository>();
            services.AddScoped<IWizardStepService, WizardStepService>();
            services.AddScoped<IWizardStepItemService, WizardStepItemService>();
        }
    }
}
