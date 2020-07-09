using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WizardLayout.Model
{
    public class ViewStepDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<ViewStepItemDto> Items { get; set; } = new List<ViewStepItemDto>();
    }
}
