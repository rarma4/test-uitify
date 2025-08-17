import React from 'react'

export default function LeadFilters({ search, setSearch, statusFilter, setStatusFilter, sortByScoreDesc, setSortByScoreDesc }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-4 flex gap-3 flex-wrap">
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou empresa"
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring" />
      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-md">
        <option>Todos</option>
        <option>Novo</option>
        <option>Contatado</option>
        <option>Qualificado</option>
        <option>Perdido</option>
        <option>Convertido</option>
      </select>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={sortByScoreDesc} onChange={e => setSortByScoreDesc(e.target.checked)} />
        <span className="text-sm">A-Z</span>
      </label>
      <div className="ml-auto text-sm text-gray-500">Latência simulada, somente local — sem backend</div>
    </div>
  )
}
