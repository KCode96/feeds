using FeedComments.DTOs;
using FeedComments.Models;
using FeedsComments.Models;
using Newtonsoft.Json;

namespace FeedComments.Helpers;

public class ResponseBody<T>
{
    public T? Data { get; set; }
    public string Message { get; set; } = String.Empty;
    public bool Success { get; set; }
}

public class Client
{
    private readonly HttpClient client = new HttpClient();
    private readonly string articleUrl;
    private readonly string userUrl;

    public Client()
    {
        IConfiguration config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        this.articleUrl = Environment.GetEnvironmentVariable("ArticleURL")!;
        this.userUrl = Environment.GetEnvironmentVariable("UserURL")!;
    }

    public async Task<Commentor> GetCommentorById(string id)
    {
        HttpResponseMessage response = await client.GetAsync(userUrl + "/" + id);

        string bodyString = await response.Content.ReadAsStringAsync();

        var body = JsonConvert.DeserializeObject<ResponseBody<Commentor>>(bodyString);

        return body!.Data!;
    }

    public async Task<GetArticleDto> GetArticleById(int id)
    {
        HttpResponseMessage response = await client.GetAsync(articleUrl + "/" + id);

        string bodyString = await response.Content.ReadAsStringAsync();

        var body = JsonConvert.DeserializeObject<ResponseBody<GetArticleDto>>(bodyString);

        return body!.Data!;
    }
}
