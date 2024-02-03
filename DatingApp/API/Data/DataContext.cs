using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    // create a table in the database for the AppUser class
    public DbSet<AppUser> Users { get; set; }
}
