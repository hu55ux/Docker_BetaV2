# DockerBeta Project

Modern development portal with React Frontend, ASP.NET Core Backend, and SQL Server, all orchestrated via Docker.

## 🚀 Quick Start

The easiest way to run the entire project is using Docker Compose:

```bash
docker compose up --build
```

Once the build is complete, you can access the services at:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5267](http://localhost:5267)
- **Database Admin (Adminer)**: [http://localhost:8080](http://localhost:8080)
- **SQL Server**: `localhost,1433`

## 🛠 Project Structure

- `/Frontend`: React + Vite + Tailwind CSS v4.
- `/DockerBeta`: ASP.NET Core 8.0 Web API (EF Core + Identity).
- `docker-compose.yml`: Full orchestration for app and database.

## 🗄 Database Management

You can manage the SQL Server database via **Adminer** at [http://localhost:8080](http://localhost:8080):

- **System**: MS SQL
- **Server**: `mssql`
- **Username**: `sa`
- **Password**: `YourStrongPassword123!`
- **Database**: `DockerBetaDB`

## 💻 Local Development (Without Docker)

### Backend
```bash
cd DockerBeta
dotnet run
```
*Note: Ensure you have SQL Server LocalDB or a running instance configured in `appsettings.json`.*

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

## 🔒 Security
- Passwords are encrypted using ASP.NET Identity hashing.
- Frontend forms persist drafts in `localStorage` to prevent data loss on refresh.
- Restricted access: Logged-in users are redirected away from Sign-Up/Login pages.

## 📦 Containerization
Both Frontend and Backend use **Alpine-based** multi-stage Docker builds for minimal image size (~20MB for Frontend).
