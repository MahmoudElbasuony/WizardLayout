using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace WizardLayout.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public abstract class BaseController : ControllerBase
    {

    }
}