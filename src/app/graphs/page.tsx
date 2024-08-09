import AffiliateInviteGraph from '@/components/graphs/AffiliateInviteGraph';
import BetsPlacedGraph from '@/components/graphs/BetsPlacedGraph';
import RevenueGraph from '@/components/graphs/RevenueGraph';
import SignupGraph from '@/components/graphs/SignupGraph';
import TransactionGraph from '@/components/graphs/TransactionGraph';
import React from 'react';

export default function Page() {
  const graphs = [
    { component: <RevenueGraph />, label: 'Revenue' },
    { component: <TransactionGraph />, label: 'Transactions' },
    { component: <SignupGraph />, label: 'Signups' },
    { component: <AffiliateInviteGraph />, label: 'Affiliate Invites' },
    { component: <BetsPlacedGraph />, label: 'Bets Placed' },
  ];

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {graphs.map(({ component, label }, index) => (
        <div key={index} className="rounded-lg shadow-lg border-gray-500 border-2 p-4 flex flex-col items-center">
          <div className="w-full h-[300px] overflow-hidden mb-4">
            {component}
          </div>
          <h3 className="text-xl font-semibold text-gray-500">{label}</h3>
        </div>
      ))}
    </main>
  );
}
