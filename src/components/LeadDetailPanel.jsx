import React from 'react'

export default function LeadDetailPanel({ lead, panelState, onClose, onSave, onConvert, onChange }) {
  if (!lead) return null
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-md bg-white shadow-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold"><span className="text-sm text-gray-500">Lead: </span>{lead.name}</h3>
            <p className="text-sm text-gray-500">Empresa: {lead.company}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 transform rotate-[44deg] text-3xl w-10 h-10 flex items-center justify-center">+</button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="text" value={lead.email} onChange={e => onChange({ ...lead, email: e.target.value })}
              className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select value={lead.status} onChange={e => onChange({ ...lead, status: e.target.value })}
              className="mt-1 block w-full border rounded px-3 py-2">
              <option>Novo</option>
              <option>Contatado</option>
              <option>Qualificado</option>
              <option>Perdido</option>
              <option>Convertido</option>
            </select>
          </div>
          {panelState.error && <div className="text-sm text-red-600">{panelState.error}</div>}
          <div className="flex gap-2">
            <button disabled={panelState.saving} onClick={() => onSave(lead)} className="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
            <button disabled={panelState.saving} onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
            <div className="ml-auto">
              <button onClick={() => onConvert(lead)} className="px-3 py-1 bg-green-600 text-white rounded">Converter Lead</button>
            </div>
          </div>
          {panelState.saving && <div className="text-sm text-gray-500">Salvando...</div>}
        </div>
      </div>
    </div>
  )
}
