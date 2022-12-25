using FeedsComments.Models;
using Microsoft.EntityFrameworkCore;

namespace FeedsComments.Data;

public class DataContext : DbContext
{
    public DbSet<Comment> Comments { get; set; }
    public string DbPath { get; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "comments.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options) =>
        options.UseSqlite($"Data Source={DbPath}");

    protected override void OnModelCreating(ModelBuilder modelBuilder) { }
}
