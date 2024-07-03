
using Microsoft.AspNetCore.SignalR;
using Reservations.Hubs;
using System.Threading.Tasks;

public class NotificationHub : Hub
{
    private readonly ShareDb _share;

    public NotificationHub(ShareDb share)
    {
        _share = share;
    }

    public async Task RegisterUser(string userId)
    {
        _share.UserConnections[Context.ConnectionId] = userId;
        await Clients.Client(Context.ConnectionId).SendAsync("ReceiveNotification", $"User {userId} registered successfully.");
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        _share.UserConnections.TryRemove(Context.ConnectionId, out _);
        return base.OnDisconnectedAsync(exception);
    }
}
