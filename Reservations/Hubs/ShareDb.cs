using Reservations.Models;
using System.Collections.Concurrent;

namespace Reservations.Hubs
{
    public class ShareDb
    {
        private readonly ConcurrentDictionary<string, string> _userConnections = new();

        public ConcurrentDictionary<string, string> UserConnections => _userConnections;
    }
}
