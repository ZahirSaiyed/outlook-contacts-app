import { FiUsers, FiUserPlus, FiMonitor } from 'react-icons/fi';
import { OutlookSignInButton, GmailSignInButton } from './SignInButtons';
import { ReactNode } from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">Welcome to Network</h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Revolutionize your network management experience with our powerful tools.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<FiUsers className="text-purple-600 w-8 h-8" />}
            title="Contact Management"
            description="Easily organize and manage your professional network."
          />
          <FeatureCard
            icon={<FiUserPlus className="text-purple-600 w-8 h-8" />}
            title="Network Growth"
            description="Track new connections and expand your network effortlessly."
          />
          <FeatureCard
            icon={<FiMonitor className="text-purple-600 w-8 h-8" />}
            title="Engagement Insights"
            description="Get valuable insights on your network interactions."
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Get Started Now</h2>
          <div className="flex flex-col items-center space-y-4">
            <OutlookSignInButton />
            <GmailSignInButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-purple-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}