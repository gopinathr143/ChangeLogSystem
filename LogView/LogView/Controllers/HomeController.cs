using LogView.Context;
using LogView.Entity;
using LogView.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace LogView.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ChangeLogContext _changeLogContext;

        public HomeController(ILogger<HomeController> logger, ChangeLogContext changeLogContext)
        {
            _logger = logger;
            _changeLogContext = changeLogContext;
        }

        public IActionResult Index()
        {            
            return View(GetChangeLogModels());
        }

        private List<ChangeLogModel> GetChangeLogModels()
        {
            var changeLogs = this._changeLogContext.ChangeLogs.AsEnumerable<ChangeLog>();
            List<ChangeLogModel> result = new List<ChangeLogModel>();
            foreach (var chaneLog in changeLogs)
            {
                result.Add(new ChangeLogModel().ToChangeLogModel(chaneLog));
            }
            return result;
        }

        [HttpPost]
        public ViewResult Index(string searchString)
        {
            var changeLogs = GetChangeLogModels();
            if (!String.IsNullOrEmpty(searchString))
            {
                changeLogs = changeLogs.Where(s => s.Type.Contains(searchString,StringComparison.OrdinalIgnoreCase)
                                       || s.Title.Contains(searchString, StringComparison.OrdinalIgnoreCase)
                                       || s.Content.Contains(searchString, StringComparison.OrdinalIgnoreCase)).ToList();
            }            
            return View(changeLogs);
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
