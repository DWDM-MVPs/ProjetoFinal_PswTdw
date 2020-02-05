using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

using System.Diagnostics;

namespace VS_React.Pages
{
				[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
				public class ErrorModel : PageModel
				{
								public string RequestId { get; set; }

								public bool ShowRequestId
								{
												get
												{
																return !string.IsNullOrEmpty(RequestId);
												}
								}

								public void OnGet()
								{
												RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
								}
				}
}