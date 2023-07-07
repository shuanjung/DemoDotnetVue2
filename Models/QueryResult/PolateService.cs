using System.Net.Http;
using System.Threading.Tasks;

namespace DemoDotnetVue2.Models.QueryResult
{
    public class PolateService
    {
        public HttpClient Client { get; }

        public PolateService(HttpClient client)
        {
            client.BaseAddress = new System.Uri("https://dtm-openapi.colife.org.tw/");
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            Client = client;
        }

        public async Task<string> GetPolateService(string longLatX, string longLatY)
        {
            string longLatParameter = $"MULTIPOINT(({longLatX} {longLatY}))";
            string data = $"TW_DLA_20010814_20061226_20M_3826_DEM";
            string dtm_key = $"152c8c98-1a0e-4a75-829e-c52e53766491";
            string ApiUrl = $"{longLatParameter}/{data}/{dtm_key}";
            using HttpResponseMessage response = await Client.GetAsync("api/Polate/getSinglePolate/" + ApiUrl);
            response.EnsureSuccessStatusCode();
            string responsestr = await response.Content.ReadAsStringAsync();
            return responsestr;
        }
    }
}
