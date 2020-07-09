using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WizardLayout.Model;

namespace WizardLayout.App_Code
{
    public  class AutoMappingProfile : Profile
    {
        public AutoMappingProfile()
        {
            #region Wizard Step

            CreateMap<WizardStep, ViewStepDto>().ReverseMap();
            CreateMap<CreateStepDto, WizardStep>().ReverseMap();

            #endregion

            #region Wizard Step Item

            CreateMap<WizardStepItem, ViewStepItemDto>().ReverseMap();
            CreateMap<CreateStepItemDto, WizardStepItem>().ReverseMap();
            CreateMap<UpdateStepItemDto, WizardStepItem>().ReverseMap();

            #endregion


        }
    }
}
