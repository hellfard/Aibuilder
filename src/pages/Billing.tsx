import React, { useState } from 'react';
import { CreditCard, Check, Star, Download, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Billing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for personal projects',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        '3 websites',
        'Basic templates',
        'Community support',
        'BuilderAI subdomain',
        '1GB storage',
        'Basic analytics'
      ],
      current: true,
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for growing businesses',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Unlimited websites',
        'Premium templates',
        'AI assistance',
        'Custom domains',
        'Priority support',
        'Code export',
        '10GB storage',
        'Advanced analytics',
        'Team collaboration (3 members)',
        'Version history'
      ],
      current: false,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and agencies',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'White-label solution',
        'Advanced integrations',
        'Dedicated support',
        'Custom training',
        '100GB storage',
        'Custom analytics',
        'SLA guarantee',
        'API access'
      ],
      current: false,
      popular: false
    }
  ];

  const usageStats = [
    { label: 'Websites Created', value: '12', limit: 'Unlimited', usage: 75 },
    { label: 'Storage Used', value: '2.4 GB', limit: '10 GB', usage: 24 },
    { label: 'Team Members', value: '1', limit: '3', usage: 33 },
    { label: 'AI Generations', value: '45', limit: '100', usage: 45 }
  ];

  const recentInvoices = [
    {
      id: 'inv_001',
      date: '2025-01-01',
      amount: 29.00,
      status: 'paid',
      plan: 'Pro Monthly'
    },
    {
      id: 'inv_002',
      date: '2024-12-01',
      amount: 29.00,
      status: 'paid',
      plan: 'Pro Monthly'
    },
    {
      id: 'inv_003',
      date: '2024-11-01',
      amount: 29.00,
      status: 'paid',
      plan: 'Pro Monthly'
    }
  ];

  const getSavingsPercentage = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0;
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100);
  };

  return (
    <div className="p-6 bg-black text-white min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <CreditCard className="w-7 h-7 mr-3 text-purple-400" />
            Billing & Subscription
          </h1>
          <p className="text-gray-400">
            Manage your subscription and billing information
          </p>
        </div>

        {/* Current Plan Overview */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Current Plan</h3>
              <p className="text-gray-400">You're currently on the Starter plan</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">Free</div>
              <div className="text-gray-400">No payment required</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {usageStats.map((stat, index) => (
              <div key={stat.label} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">{stat.label}</span>
                  <span className="text-sm font-medium">{stat.value}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stat.usage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">of {stat.limit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Plans */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-4">Upgrade Your Plan</h2>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs bg-green-600 text-white px-2 py-1 rounded">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gray-900 border rounded-lg p-6 ${
                  plan.popular 
                    ? 'border-purple-500 scale-105' 
                    : plan.current
                    ? 'border-green-500'
                    : 'border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-3 py-1 text-sm font-medium rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                      Current Plan
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-400">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                    {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-green-400 mt-1">
                        Save {getSavingsPercentage(plan.monthlyPrice, plan.yearlyPrice)}%
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.current
                        ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Method & Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Method */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
              Payment Method
            </h3>
            
            <div className="p-4 border border-gray-700 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">No payment method on file</div>
                  <div className="text-sm text-gray-400">Add a payment method to upgrade</div>
                </div>
                <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <button className="w-full bg-white text-black py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Add Payment Method
            </button>
          </div>

          {/* Recent Invoices */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                Recent Invoices
              </h3>
              <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium">{invoice.plan}</div>
                    <div className="text-sm text-gray-400">{new Date(invoice.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">${invoice.amount.toFixed(2)}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      invoice.status === 'paid' 
                        ? 'bg-green-950 text-green-400' 
                        : 'bg-yellow-950 text-yellow-400'
                    }`}>
                      {invoice.status}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
