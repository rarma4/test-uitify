import React from 'react'

export default function OpportunitiesTable({ opportunities }) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-medium mb-2">Opportunities</h2>
      <div className="bg-white p-4 rounded-md shadow">
        {opportunities.length === 0 ? (
          <div className="text-gray-500">Nenhuma oportunidade criada ainda.</div>
        ) : (
          <table className="w-full text-left divide-y">
            <thead className="bg-gray-50"><tr>
              <th className="px-3 py-2 text-sm">Nome</th>
              <th className="px-3 py-2 text-sm">Status</th>
              <th className="px-3 py-2 text-sm">Empresa</th>
              <th className="px-3 py-2 text-sm">Valor</th>
            </tr></thead>
            <tbody>
              {opportunities.map(o => (
                <tr key={o.id}><td className="px-3 py-2">{o.name}</td><td className="px-3 py-2">{o.stage}</td><td className="px-3 py-2">{o.accountName}</td><td className="px-3 py-2">{o.amount ?? '-'}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
