using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiSignalR.Hubs.Interfaces;

namespace WebApiSignalR.Hubs
{
    public delegate void ClientConnectionEventHandler(string clientId);
    public delegate void ClientNameChangedEventHandler(string clientId, string newName);
    public delegate void ClientGroupEventHandler(string clientId, string groupName);

    public delegate void MessageReceivedEventHandler(string senderClientId, string message);

    public class SignalrDemoHub : Hub<ISignalrDemoHub>
    {
        static ConcurrentDictionary<string, string> _users = new ConcurrentDictionary<string, string>();
        public static event ClientConnectionEventHandler ClientConnected;
        public static event ClientConnectionEventHandler ClientDisconnected;
        public static event ClientNameChangedEventHandler ClientNameChanged;

        public static event ClientGroupEventHandler ClientJoinedToGroup;
        public static event ClientGroupEventHandler ClientLeftGroup;

        public static event MessageReceivedEventHandler MessageReceived;

        public void Hello()
        {
            Clients.Caller.DisplayMessage("Hello from the SignalrDemoHub!");
        }

        //public void Send(string msg)
        //{
        //    Clients.Caller.DisplayMessage(msg);
        //}

        public static void ClearState()
        {
            _users.Clear();
        }

        //Called when a client is connected
        //public override Task OnConnected()
        //{
        //    _users.TryAdd(Context.ConnectionId, Context.ConnectionId);

        //    ClientConnected?.Invoke(Context.ConnectionId);

        //    return base.OnConnected();
        //}

        ////Called when a client is disconnected
        //public override Task OnDisconnected(bool stopCalled)
        //{
        //    string userName;
        //    _users.TryRemove(Context.ConnectionId, out userName);

        //    ClientDisconnected?.Invoke(Context.ConnectionId);

        //    return base.OnDisconnected(stopCalled);
        //}

        #region Client Methods

        public void SetUserName(string userName)
        {
            _users[Context.ConnectionId] = userName;

            ClientNameChanged?.Invoke(Context.ConnectionId, userName);
        }

        //public async Task JoinGroup(string groupName)
        //{
        //    await Groups.Add(Context.ConnectionId, groupName);

        //    ClientJoinedToGroup?.Invoke(Context.ConnectionId, groupName);
        //}

        //public async Task LeaveGroup(string groupName)
        //{
        //    await Groups.Remove(Context.ConnectionId, groupName);

        //    ClientLeftGroup?.Invoke(Context.ConnectionId, groupName);
        //}

        public void Send(string client, string msg)
        {
          Clients.Client(client).addMessage("SERVER",msg);
            // Clients.Client(client).DisplayMessage(msg);

            // MessageReceived?.Invoke(Context.ConnectionId, msg);
        }

        #endregion
    }

}
