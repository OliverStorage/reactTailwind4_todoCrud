import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function ResetPassword({ switchToLogin }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(email);
            setMessage("Check your inbox for further instructions");
        } catch (err) {
            setError("Failed to reset password: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Reset Password
            </h2>

            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                    role="alert"
                >
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {message && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
                    role="alert"
                >
                    <span className="block sm:inline">{message}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Sending..." : "Reset Password"}
                </button>
            </form>

            <div className="mt-4 text-center">
                <p>
                    <button
                        onClick={switchToLogin}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Back to Login
                    </button>
                </p>
            </div>
        </div>
    );
}
