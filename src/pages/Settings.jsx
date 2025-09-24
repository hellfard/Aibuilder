import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Code, Globe, Trash2, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Product designer and web developer',
      company: 'Acme Inc',
      website: 'https://johndoe.com',
      location: 'San Francisco, CA'
    },
    notifications: {
      emailUpdates: true,
      projectShares: true,
      weeklyReports: false,
      marketingEmails: false,
      securityAlerts: true
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      timezone: 'America/Los_Angeles',
      autoSave: true,
      showTips: true
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette },
    { id: 'api', name: 'API Keys', icon: Code },
    { id: 'advanced', name: 'Advanced', icon: SettingsIcon }
  ];

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <div>
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Change Avatar
          </button>
          <p className="text-sm text-gray-400 mt-1">JPG, GIF or PNG. Max size 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => updateSetting('profile', 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => updateSetting('profile', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
          <input
            type="text"
            value={settings.profile.company}
            onChange={(e) => updateSetting('profile', 'company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
          <input
            type="url"
            value={settings.profile.website}
            onChange={(e) => updateSetting('profile', 'website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            value={settings.profile.bio}
            onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'emailUpdates', label: 'Product updates and announcements', description: 'Get notified about new features and updates' },
            { key: 'projectShares', label: 'Project shares and collaborations', description: 'When someone shares a project with you' },
            { key: 'weeklyReports', label: 'Weekly activity reports', description: 'Summary of your weekly activity' },
            { key: 'marketingEmails', label: 'Marketing emails', description: 'Tips, tutorials, and promotional content' },
            { key: 'securityAlerts', label: 'Security alerts', description: 'Important security and account notifications' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-gray-400">{item.description}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Two-Factor Authentication</div>
            <div className="text-sm text-gray-400">Add an extra layer of security to your account</div>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Enable 2FA
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
        <div className="space-y-3">
          {[
            { provider: 'Google', connected: true, email: 'john@gmail.com' },
            { provider: 'GitHub', connected: false, email: null },
            { provider: 'Discord', connected: false, email: null }
          ].map((account) => (
            <div key={account.provider} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">{account.provider}</div>
                  {account.connected ? (
                    <div className="text-sm text-gray-400">{account.email}</div>
                  ) : (
                    <div className="text-sm text-gray-400">Not connected</div>
                  )}
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg transition-colors ${
                account.connected
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}>
                {account.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Password</h3>
        <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Change Password
        </button>
      </div>
    </div>
  );

  const renderAPITab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">API Access</h3>
        <p className="text-gray-400 mb-6">
          Use API keys to integrate BuilderAI with your applications and workflows.
        </p>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Personal Access Token</div>
              <div className="text-sm text-gray-400">Created on Jan 10, 2025</div>
            </div>
            <div className="flex items-center space-x-2">
              <code className="bg-gray-900 px-3 py-1 rounded text-sm">bai_••••••••••••••••</code>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Code className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Generate New Token
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Webhooks</h3>
        <p className="text-gray-400 mb-4">
          Configure webhooks to receive real-time notifications about your projects.
        </p>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          Add Webhook
        </button>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="border border-red-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-400">Export Account Data</div>
                <div className="text-sm text-gray-400">Download all your account data and projects</div>
              </div>
              <button className="border border-red-600 text-red-400 px-4 py-2 rounded-lg hover:bg-red-950 transition-colors">
                Export Data
              </button>
            </div>
          </div>
          
          <div className="border border-red-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-400">Delete Account</div>
                <div className="text-sm text-gray-400">Permanently delete your account and all data</div>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      case 'api':
        return renderAPITab();
      case 'advanced':
        return renderAdvancedTab();
      default:
        return <div>Preferences coming soon...</div>;
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <SettingsIcon className="w-7 h-7 mr-3 text-purple-400" />
            Settings
          </h1>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>

              {/* Save Button */}
              {activeTab === 'profile' || activeTab === 'notifications' && (
                <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
                  <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
