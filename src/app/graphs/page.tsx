import AffiliateInviteGraph from '@/components/graphs/AffiliateInviteGraph';
import BetsPlacedGraph from '@/components/graphs/BetsPlacedGraph';
import RevenueGraph from '@/components/graphs/RevenueGraph';
import SignupGraph from '@/components/graphs/SignupGraph';
import TransactionGraph from '@/components/graphs/TransactionGraph';
import React from 'react';

export default function Page() {
  const graphs = [
    { component: <RevenueGraph />, label: 'Revenue' },
    { component: <SignupGraph />, label: 'Signups' },
    { component: <AffiliateInviteGraph />, label: 'Affiliate Invites' },
    { component: <BetsPlacedGraph />, label: 'Bets Placed' },
    { component: <TransactionGraph />, label: 'Transactions' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {graphs.map(({ component, label }, index) => (
        <section
          key={index}
          className="rounded-xl bg-gray-800 border border-gray-700 p-6 shadow-xl flex flex-col items-center"
        >
          <section className="w-full mb-4">
            {component}
          </section>
          <h3 className="text-2xl font-bold text-white tracking-wide">{label}</h3>
        </section>
      ))}
    </div>
  );
}
