using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WizardLayout.Model
{
    public class UpdateStepItemDto
    {
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Step item name is required")]
        public string Name { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Step item title is required")]
        public string Title { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Step item description is required")]
        public string Description { get; set; }
    }
}
