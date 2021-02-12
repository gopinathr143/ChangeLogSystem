using ChamgeLogSystem.Entity;
using ChamgeLogSystem.Helpers;
using ChamgeLogSystem.Helpers.Interface;
using ChamgeLogSystem.Model;
using ChamgeLogSystem.Repository;
using ChamgeLogSystem.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ChangeLogController : ControllerBase
    {
        private readonly IDataRepository<ChangeLog> _dataRepository;

        public ChangeLogController(IDataRepository<ChangeLog> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        // GET: api/ChangeLog
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<ChangeLog> changeLog = _dataRepository.GetAll();
            return Ok(changeLog);
        }


        [HttpGet("{userId}/logs")]
        public IActionResult GetByUserId(long userId)
        {
            IEnumerable<ChangeLog> changeLog = _dataRepository.GetAll().Where(x=>x.CreatedByUserId==userId);
            return Ok(changeLog);
        }

        // GET: api/ChangeLog/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(long id)
        {
            ChangeLog changeLog = _dataRepository.Get(id);
            if (changeLog == null)
            {
                return NotFound("The changeLog couldn't be found.");
            }
            return Ok(changeLog);
        }

        // POST: api/ChangeLog
        [HttpPost]
        public IActionResult Post([FromBody] AddChangeLogRequest request)
        {
            if (request == null)
            {
                return BadRequest("Log is null.");
            }
            var changeLog = request.ToChangeLog();
            _dataRepository.Add(changeLog);
            return Ok(changeLog);
        }

        // PUT: api/ChangeLog/5
        [HttpPut]
        public IActionResult Put([FromBody] UpdateChangeLogRequest request)
        {
            if (request == null)
            {
                return BadRequest("Log is null.");
            }
            ChangeLog changeLogToUpdate = request.ToChangeLog();
            if (changeLogToUpdate == null)
            {
                return NotFound("The ChangeLog  couldn't be found.");
            }
            _dataRepository.Update(changeLogToUpdate);
            return NoContent();
        }


        // DELETE: api/ChangeLog/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            ChangeLog changeLog = _dataRepository.Get(id);
            if (changeLog == null)
            {
                return NotFound("The changeLog couldn't be found.");
            }
            _dataRepository.Delete(changeLog);
            return NoContent();
        }
    }
}
