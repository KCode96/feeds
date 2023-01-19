namespace FeedComments.Helpers;

public class Response<T> 
{
    public T? Data {get; set;}
    public String Message {get; set;}  = String.Empty;
    public Boolean Success {get; set;} = true;
}