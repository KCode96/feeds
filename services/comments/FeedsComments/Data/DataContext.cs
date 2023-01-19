using FeedsComments.Models;
using Microsoft.EntityFrameworkCore;

namespace FeedsComments.Data;

public class DataContext : DbContext
{
    public DbSet<Comment> Comments { get; set; }
    public string DbPath { get; }

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder options) =>
        options.UseNpgsql(
            @"Host=containers-us-west-129.railway.app;Port=7792;Username=postgres;Password=cQhUhuj0wgFmZK497Dvg;Database=railway"
        );

    protected override void OnModelCreating(ModelBuilder modelBuilder) { }
}
