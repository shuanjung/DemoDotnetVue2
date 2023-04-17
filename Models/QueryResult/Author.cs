namespace DemoDotnetVue2.Models.QueryResult
{
    public partial class AuthorInfo
    {
        public string Domain { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
    }
    public partial class IsAuthor
    {
        public string Tologin { get; set; }
        public string Traceid { get; set; }
        public string Cname { get; set; }
    }
    public partial class Trace
    {
        public string Traceid { set; get; }
    }
}
