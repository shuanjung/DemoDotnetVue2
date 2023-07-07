using System.Collections.Generic;

namespace DemoDotnetVue2.Models.QueryResult
{
    public class PolateInfo
    {
        public string count { get; set; }
        public List<PointArray> PointArray { get; set; }
    }

    public class PointArray
    {
        public string X { get; set; }
        public string Y { get; set; }
        public string Z { get; set; }
    }
}
