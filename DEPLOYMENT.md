# Deployment Instructions

## Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ installed
- MongoDB instance (local or cloud)

## Environment Setup
1. Copy `.env.example` to `.env`
2. Update environment variables with production values
3. Ensure MongoDB connection string is correct

## Build and Deploy
1. Build the application:
   ```bash
   npm run build
   ```

2. Start the containers:
   ```bash
   npm run deploy
   ```

## Monitoring
- Health check endpoint: `/health`
- Monitor logs: `docker-compose logs -f`

## Backup
1. Database backup:
   ```bash
   docker exec mongodb mongodump --out /backup
   ```

## Troubleshooting
- Check logs: `docker-compose logs`
- Restart services: `docker-compose restart`
- Check MongoDB connection: `docker exec mongodb mongosh` 