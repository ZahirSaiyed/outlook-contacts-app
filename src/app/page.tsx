'use client';

import { useState, useEffect, useMemo } from 'react';
import { useMsal } from "@azure/msal-react";
import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { graphScopes } from '../config';
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiUserPlus, FiMonitor, FiMenu, FiX } from 'react-icons/fi';
import LandingPage from '../app/components/LandingPage';

interface Contact {
  name: string;
  email: string;
  industry?: string;
  company?: string;
  lastContacted: string;
  linkedInOrWebsite?: string;
  notes?: string;
  type: 'sent' | 'received';
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      setIsAuthenticated(true);
    }
  }, [accounts]);

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 transition-all duration-300 ${
        isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'
      }`}>
        <div className="container mx-auto px-6 py-8">
          <Header />
          <Stats contacts={contacts} />
          <ContactList setContacts={setContacts} />
        </div>
      </main>
    </div>
  );
}

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-screen bg-white w-64 shadow-lg z-20"
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-2xl font-semibold text-gray-800">Network</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700">
              Dashboard
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-500 hover:text-white bg-purple-500 text-white">
              Contact Management
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700">
              Engagement
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700">
              Network Intelligence
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700">
              Promote
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700">
              Help
            </a>
          </nav>
          <div className="p-4 border-t">
            <p className="text-sm text-purple-800 font-medium">Upgrade to PRO to get access all Features!</p>
            <button className="mt-2 w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition duration-200">
              Get Pro Now!
            </button>
          </div>
        </div>
      </motion.div>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 left-4 z-30 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-purple-600 focus:outline-none ${
          isOpen ? 'hidden' : 'block'
        }`}
        aria-label="Open sidebar"
      >
        <FiMenu size={24} />
      </button>
    </>
  );
}

function Header() {
  const { accounts } = useMsal();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserName(accounts[0]?.name || "Guest");
  }, [accounts]);

  if (userName === null) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-semibold text-gray-800">Hello {userName} 👋</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="bg-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
        />
        <svg className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function Stats({ contacts }: { contacts: Contact[] }) {
  const totalContacts = contacts.length;

  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const activeContacts = contacts.filter(contact => {
    const lastContactedDate = new Date(contact.lastContacted);
    return lastContactedDate >= oneMonthAgo;
  }).length;

  const newContactsThisMonth = contacts.filter(contact => {
    const contactDate = new Date(contact.lastContacted);
    return contactDate >= firstDayOfMonth;
  }).length;

  const previousMonthContacts = totalContacts - newContactsThisMonth;
  const growthRate = previousMonthContacts > 0 
    ? ((newContactsThisMonth - previousMonthContacts) / previousMonthContacts) * 100 
    : 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard 
        icon={<FiUsers className="text-green-600" />} 
        title="Total Contacts" 
        value={totalContacts.toString()} 
        change={growthRate.toFixed(1)} 
      />
      <StatCard 
        icon={<FiUserPlus className="text-green-600" />} 
        title="New This Month" 
        value={newContactsThisMonth.toString()} 
      />
      <StatCard 
        icon={<FiMonitor className="text-green-600" />} 
        title="Active Contacts" 
        value={activeContacts.toString()} 
      />
    </div>
  );
}

function StatCard({ icon, title, value, change }: { icon: React.ReactNode; title: string; value: string; change?: string }) {
  return (
    <div className="bg-white rounded-lg p-6 flex items-center">
      <div className="bg-green-100 rounded-full p-3 mr-4">{icon}</div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        {change !== undefined && (
          <p className={`text-sm ${parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {parseFloat(change) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(change))}% this month
          </p>
        )}
      </div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="text-center">
      <div className="flex flex-col space-y-4 items-center">
        <OutlookSignInButton />
        <GmailSignInButton />
      </div>
      <p className="mt-6 text-gray-300 text-lg">
        Connect your accounts to revolutionize your network management experience.
      </p>
    </div>
  );
}

function OutlookSignInButton() {
  const { instance } = useMsal();

  const handleSignIn = () => {
    instance.loginPopup({scopes: graphScopes}).catch(console.error);
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 flex items-center space-x-2"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.179 4.885l-7.679 5.747v8.181l7.679-4.779V4.885zM2.821 4.885v9.149l7.679 4.779v-8.181L2.821 4.885z"/>
      </svg>
      <span>Connect Outlook</span>
    </button>
  );
}

function GmailSignInButton() {
  return (
    <button
      disabled
      className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out cursor-not-allowed flex items-center space-x-2 opacity-50"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
      <span>Connect Gmail (Coming Soon)</span>
    </button>
  );
}

function ContactList({ setContacts }: { setContacts: React.Dispatch<React.SetStateAction<Contact[]>> }) {
  const [contacts, setLocalContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState('');
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const fetchContacts = async () => {
      if (accounts[0]) {
        const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(instance as PublicClientApplication, {
          account: accounts[0],
          scopes: graphScopes,
          interactionType: InteractionType.Popup
        });
        const graphClient = Client.initWithMiddleware({ authProvider });

        try {
          const sentResponse = await graphClient.api('/me/mailFolders/SentItems/messages')
            .top(50)
            .select('subject,toRecipients,sentDateTime')
            .orderby('sentDateTime DESC')
            .get();

          const receivedResponse = await graphClient.api('/me/mailFolders/Inbox/messages')
            .top(50)
            .select('subject,from,receivedDateTime')
            .orderby('receivedDateTime DESC')
            .get();
          const allContacts = [
            ...sentResponse.value.map((email: { toRecipients: [{ emailAddress: { name: string, address: string } }], sentDateTime: string }) => ({
              name: email.toRecipients[0].emailAddress.name,
              email: email.toRecipients[0].emailAddress.address,
              lastContacted: email.sentDateTime,
              type: 'sent' as const,
              industry: '',
              company: '',
              linkedInOrWebsite: '',
              notes: ''
            })),
            ...receivedResponse.value.map((email: { from: { emailAddress: { name: string, address: string } }, receivedDateTime: string }) => ({
              name: email.from.emailAddress.name,
              email: email.from.emailAddress.address,
              lastContacted: email.receivedDateTime,
              type: 'received' as const,
              industry: '',
              company: '',
              linkedInOrWebsite: '',
              notes: ''
            }))
          ];
          const uniqueContacts = Array.from(new Map(allContacts.map(contact => [contact.email, contact])).values());
          setLocalContacts(uniqueContacts.sort((a, b) => new Date(b.lastContacted).getTime() - new Date(a.lastContacted).getTime()));
          setContacts(uniqueContacts.sort((a, b) => new Date(b.lastContacted).getTime() - new Date(a.lastContacted).getTime()));
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };

    fetchContacts();
  }, [instance, accounts, setContacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.email.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-800">All Contacts</h2>
        <input
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-100 rounded-lg py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Industry</th>
              <th className="px-2 py-2">Company</th>
              <th className="px-2 py-2">Last Contacted</th>
              <th className="px-2 py-2">LinkedIn/Website</th>
              <th className="px-2 py-2">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <tr key={contact.email} className="hover:bg-gray-50 text-gray-700">
                <td className="px-2 py-1 whitespace-nowrap">{contact.name}</td>
                <td className="px-2 py-1 whitespace-nowrap text-xs">{contact.email}</td>
                <td className="px-2 py-1">{contact.industry || ''}</td>
                <td className="px-2 py-1">{contact.company || ''}</td>
                <td className="px-2 py-1 whitespace-nowrap">{new Date(contact.lastContacted).toLocaleDateString()}</td>
                <td className="px-2 py-1">{contact.linkedInOrWebsite || ''}</td>
                <td className="px-2 py-1">{contact.notes || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
        Showing {filteredContacts.length} contacts
      </div>
    </div>
  );
}