using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiSignalR.Hubs.Interfaces
{
    public interface ISignalrDemoHub
    {
        Task DisplayMessage(string message);
        Task OnConnected();

        Task addMessage(string client, string message);
    }
}
