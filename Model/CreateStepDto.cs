using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WizardLayout.Model
{
    public class CreateStepDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Step title is required!")]
        public string Title { get; set; }
    }
}
