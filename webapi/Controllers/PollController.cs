using Microsoft.AspNetCore.Mvc;
using webapi.Models;

namespace webapi.Controllers;

[ApiController]
public class PollController : ControllerBase
{
    private static List<PollResult> _pollResults = new List<PollResult>();

    private readonly ILogger<PollController> _logger;

    private readonly IConfiguration _configuration;

    public PollController(ILogger<PollController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    [HttpPost]
    [Route("api/poll/vote")]
    public IActionResult Post([FromBody] PollModel poll)
    {
        // handling the poll result and storing it in the backend, by updating the poll results
        var existingPoll = _pollResults.FirstOrDefault(val => val.Option == poll.Option);
        if (existingPoll != null)
        {
            existingPoll.Count++;
        }
        else
        {
            _pollResults.Add(new PollResult { Option = poll.Option, Count = 1 });
        }

        return Ok();
    }

    [HttpGet]
    [Route("api/poll/results")]
    public IActionResult GetResults() 
    {
        return Ok(_pollResults);
    }

    [HttpGet]
    [Route("api/poll/configuration")]
    public IActionResult GetConfiguration() 
    {
        var pollConfiguration = _configuration.GetSection("PollConfiguration").Get<PollConfiguration>();
        return Ok(pollConfiguration);
    }

}


public class PollModel
{
    public string Option { get; set; }
}
    

public class PollResult
{
    public string Option { get; set; }

    public int Count { get; set; }
}