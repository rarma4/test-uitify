import React from 'react'

export default function LeadTable({ leads, onOpenLead, onConvert }) {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <table className="w-full text-left divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-sm font-medium">Nome</th>
            <th className="px-4 py-3 text-sm font-medium">Empresa</th>
            <th className="px-4 py-3 text-sm font-medium">Email</th>
            <th className="px-4 py-3 text-sm font-medium">Origem</th>
            <th className="px-4 py-3 text-sm font-medium">Pontuação</th>
            <th className="px-4 py-3 text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-sm font-medium">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.length === 0 ? (
            <tr><td colSpan={7} className="p-6 text-center text-gray-500">Nenhum lead encontrado.</td></tr>
          ) : leads.map(lead => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 cursor-pointer" onClick={() => onOpenLead(lead)}>{lead.name}</td>
              <td className="px-4 py-3">{lead.company}</td>
              <td className="px-4 py-3">{lead.email}</td>
              <td className="px-4 py-3">{lead.source}</td>
              <td className="px-4 py-3 font-mono">{lead.score}</td>
              <td className="px-4 py-3">{lead.status}</td>
              <td className="px-4 py-3">
                <button onClick={() => onConvert(lead)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Converter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
