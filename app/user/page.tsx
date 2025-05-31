// app/users/page.tsx
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';

async function getLoggedInUserEmail() {
  const cookieStore = cookies();
  const email = (await cookieStore).get('userEmail')?.value || '';
  return email;
}

export default async function UsersPage() {
  await connectToDatabase();

  const loggedInEmail = await getLoggedInUserEmail();

  if (!loggedInEmail) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">User Details</h1>
        <p className="text-red-600">Not logged in</p>
      </div>
    );
  }

  // Find the logged-in user by email
  const user = await User.findOne({ email: loggedInEmail }).lean();

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">User Details</h1>
        <p className="text-red-600">User not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>

      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Username</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">DOB</th>
            <th className="border px-4 py-2 text-left">Terms</th>
            <th className="border px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white text-black font-semibold">
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{new Date(user.dob).toLocaleDateString()}</td>
            <td className="border px-4 py-2">{user.terms ? 'Accepted' : 'Rejected'}</td>
            <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
