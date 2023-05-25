namespace webapi.Tests;

using global::webapi.Controllers;
using global::webapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using Xunit;

public class PollControllerTests
{
    private readonly PollController _controller;
    private readonly Mock<ILogger<PollController>> _loggerMock;
    private readonly Mock<IConfiguration> _configurationMock;

    public PollControllerTests()
    {
        _configurationMock = new Mock<IConfiguration>();
        _controller = new PollController(_loggerMock.Object, _configurationMock.Object);
    }

    [Fact]
    public void GetResults_EmptyPollResults_ShouldReturnEmptyList()
    {
        // Act
        var result = _controller.GetResults() as OkObjectResult;

        // Assert
        Assert.IsNotNull(result);
        Assert.IsNotNull(result.Value);

        var pollResults = result.Value as List<PollResult>;
        Assert.IsNull(pollResults);
    }
}