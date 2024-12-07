import React from 'react';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  auth: boolean;
  body?: Record<string, string>;
  response?: Record<string, string>;
  example?: {
    request?: string;
    response?: string;
  };
}

interface Section {
  title: string;
  description: string;
  endpoints: Endpoint[];
}

const API_DOCS: Section[] = [
  {
    title: "Authentication",
    description: "User authentication and profile management endpoints",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/register",
        description: "Register a new user account",
        auth: false,
        body: {
          name: "string - User's full name",
          email: "string - Valid email address",
          password: "string - Minimum 6 characters"
        },
        response: {
          token: "JWT token for authentication",
          user: "User object with profile details"
        },
        example: {
          request: `{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}`,
          response: `{
  "token": "eyJhbGciOiJ...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "points": 100
  }
}`
        }
      },
      {
        method: "POST",
        path: "/api/auth/login",
        description: "Login to existing account",
        auth: false,
        body: {
          email: "string - Registered email",
          password: "string - Account password"
        },
        response: {
          token: "JWT token",
          user: "User profile"
        }
      },
      {
        method: "GET",
        path: "/api/auth/profile",
        description: "Get authenticated user's profile",
        auth: true,
        response: {
          user: "Full user profile with points"
        }
      }
    ]
  },
  {
    title: "Rewards",
    description: "Manage reward listings and redemptions",
    endpoints: [
      {
        method: "GET",
        path: "/api/rewards",
        description: "Get all available rewards",
        auth: true,
        response: {
          rewards: "Array of reward objects"
        }
      },
      {
        method: "POST",
        path: "/api/rewards",
        description: "Create new reward listing",
        auth: true,
        body: {
          title: "string - Reward title",
          description: "string - Detailed description",
          points: "number - Points required",
          category: "string - Category ID",
          expiryDate: "date - Expiration date (optional)"
        }
      },
      {
        method: "PUT",
        path: "/api/rewards/:id",
        description: "Update existing reward",
        auth: true,
        body: {
          title: "string (optional)",
          description: "string (optional)",
          points: "number (optional)",
          isActive: "boolean (optional)"
        }
      }
    ]
  },
  {
    title: "Transactions",
    description: "Handle reward redemptions and exchanges",
    endpoints: [
      {
        method: "POST",
        path: "/api/transactions/redeem",
        description: "Redeem a reward using points",
        auth: true,
        body: {
          rewardId: "string - ID of reward to redeem"
        },
        response: {
          message: "Success message",
          remainingPoints: "Updated user points",
          redemptionId: "Transaction ID"
        }
      }
    ]
  }
];

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
      <p className="text-gray-600 mb-8">
        Base URL: <code className="bg-gray-100 px-2 py-1 rounded">https://rex-api-tau.vercel.app</code>
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Authentication</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">
            All authenticated endpoints require a Bearer token in the Authorization header:
          </p>
          <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
            Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
          </pre>
        </div>
      </div>

      {API_DOCS.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
          <p className="text-gray-600 mb-6">{section.description}</p>

          <div className="space-y-6">
            {section.endpoints.map((endpoint, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium
                      ${endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                        endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'}`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono">{endpoint.path}</code>
                  </div>
                  <p className="mt-2 text-gray-600">{endpoint.description}</p>
                </div>

                {endpoint.body && (
                  <div className="p-4 border-b">
                    <h4 className="font-semibold mb-2">Request Body</h4>
                    <div className="bg-gray-50 p-3 rounded">
                      {Object.entries(endpoint.body).map(([key, value]) => (
                        <div key={key} className="mb-1">
                          <code className="text-sm font-mono text-purple-600">{key}</code>
                          <span className="text-gray-600 text-sm"> - {value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {endpoint.example && (
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Example</h4>
                    {endpoint.example.request && (
                      <>
                        <p className="text-sm text-gray-600 mb-1">Request:</p>
                        <pre className="bg-gray-800 text-white p-3 rounded mb-3 overflow-x-auto">
                          {endpoint.example.request}
                        </pre>
                      </>
                    )}
                    {endpoint.example.response && (
                      <>
                        <p className="text-sm text-gray-600 mb-1">Response:</p>
                        <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
                          {endpoint.example.response}
                        </pre>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Documentation;
