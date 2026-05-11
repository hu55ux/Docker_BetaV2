import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 text-center fade-in">
            <div className="space-y-6">
                <h1 className="text-9xl font-bold gradient-text opacity-50">404</h1>
                <h2 className="text-3xl font-bold">Page Not Found</h2>
                <p className="text-gray-400 max-w-md">
                    The page you are looking for doesn't exist or has been moved to another dimension.
                </p>
                <div className="pt-6">
                    <Link to="/" className="btn btn-primary px-8">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
