using DockerBeta.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DockerBeta.Database;

public class DockerBetaDB : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public DockerBetaDB(DbContextOptions<DockerBetaDB> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.ApplyConfigurationsFromAssembly(typeof(DockerBetaDB).Assembly);
    }
}
