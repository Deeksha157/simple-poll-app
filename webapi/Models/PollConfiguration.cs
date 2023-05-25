namespace webapi.Models;

public class PollConfiguration
{
    public string Question { get; set; }

    public List<PollOption> Options { get; set; }
}

public class PollOption
{
    public int Id { get; set; }

    public string Text { get; set; }
}
