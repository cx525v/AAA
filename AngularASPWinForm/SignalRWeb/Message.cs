using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRWeb
{
    public class Message
    {
        public string MessageText { get; set; }
        public string User { get; set; }

        public string SendTo { get; set; }
    }
}