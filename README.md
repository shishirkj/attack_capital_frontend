# Attack Capital Assignment Frontend

A Next.js-based frontend application for the Attack Capital assignment.

## Setup Instructions

1. Clone the repository:

```bash
git clone [your-repository-url]
cd attack-capital-assignment-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=https://attack-capital-backend.onrender.com
```

> **Note**: If the remote server fails, you can run the server locally and update the `.env.local` file to:
>
> ```bash
> NEXT_PUBLIC_API_URL=http://localhost:3001
> ```

4. Run the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── data/
│   └── services/      # API service implementations
│       ├── auth/      # Authentication services
│       └── post/      # Post-related services
├── domain/
│   └── entities/      # Domain entities (Auth, Post)
├── pages/             # Next.js pages
└── components/        # React components
```

## Technology Choices

- **Next.js**: For server-side rendering and routing
- **TypeScript**: For type safety and better developer experience
- **Axios**: For HTTP requests
- **js-cookie**: For cookie management
- **Domain-Driven Design**: For better separation of concerns

## Available Commands

- `npm run dev`: Start development server
- `npm run build`: Build production version
- `npm start`: Start production server
- `npm run lint`: Run linting
- `npm run test`: Run tests

## API Integration

The frontend communicates with a REST API backend. The base URL is configured through the `NEXT_PUBLIC_API_URL` environment variable.

## Authentication

- JWT-based authentication
- Cookies used for token storage
- Protected routes require authentication

## Features

- User authentication (login/signup)
- Post creation and viewing
- Pagination support
- Author-specific post filtering

## Error Handling

- Comprehensive error messages
- Form validation
- API error handling with user-friendly messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Your chosen license]
