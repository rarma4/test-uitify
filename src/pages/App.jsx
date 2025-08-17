import React, { useEffect, useMemo, useState } from 'react'
import leadsData from '../leads.json'

function simulateLatency(ms = 700) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// keys for localStorage persistence
const LS_KEY = 'leads-mvp:v1'

// ---------- App component ----------
export default function App() {
  // app state
  const [leads, setLeads] = useState(null) // null = loading
  const [opportunities, setOpportunities] = useState([])

  // UI controls
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [sortByScoreDesc, setSortByScoreDesc] = useState(true)

  // selected lead for slide-over
  const [selectedLead, setSelectedLead] = useState(null)
  const [panelState, setPanelState] = useState({ saving: false, error: null })

  // load persisted controls
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setSearch(parsed.search || '')
        setStatusFilter(parsed.statusFilter || 'Todos')
        setSortByScoreDesc(parsed.sortByScoreDesc ?? true)
      } catch (e) { /* ignore */ }
    }
  }, [])

  // persist controls
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ search, statusFilter, sortByScoreDesc }))
  }, [search, statusFilter, sortByScoreDesc])

  // load leads (simulate latency)
  useEffect(() => {
    let mounted = true
    setLeads(null)
    simulateLatency(800).then(() => {
      if (!mounted) return
      // deep copy of imported leads
      setLeads(leadsData.map(l => ({ ...l })))
    })
    return () => { mounted = false }
  }, [])

  // derived list (search + filter + sort)
  const visibleLeads = useMemo(() => {
    if (!leads) return []
    const s = search.trim().toLowerCase()
    let out = leads.filter(l => {
      if (statusFilter !== 'Todos' && l.status !== statusFilter) return false
      if (!s) return true
      return l.name.toLowerCase().includes(s) || l.company.toLowerCase().includes(s)
    })
    out.sort((a,b) => (sortByScoreDesc ? b.score - a.score : a.score - b.score))
    return out
  }, [leads, search, statusFilter, sortByScoreDesc])

  // UI actions
  const openLead = (lead) => {
    setSelectedLead({ ...lead })
    setPanelState({ saving: false, error: null })
  }

  const closePanel = () => {
    setSelectedLead(null)
    setPanelState({ saving: false, error: null })
  }

  // optimistic update when saving lead edits
  const saveLead = async (updated) => {
    if (!isValidEmail(updated.email)) {
      setPanelState({ saving: false, error: 'Formato de e-mail inválido.' })
      return
    }

    // optimistic update
    setLeads(prev => prev.map(l => l.id === updated.id ? { ...l, ...updated } : l))
    setPanelState({ saving: true, error: null })

    // simulate latency and random failure (25%)
    await simulateLatency(900)
    const failed = Math.random() < 0.25
    if (failed) {
  // rollback: reload from leadsData to simplify demo (in real app keep previous snapshot)
  setLeads(prev => prev.map(l => l.id === updated.id ? leadsData.find(s => s.id === l.id) || l : l))
      setPanelState({ saving: false, error: 'Falha ao salvar (simulada). Alterações revertidas.' })
      return
    }

    // success
    setPanelState({ saving: false, error: null })
    setSelectedLead(null)
  }

  const convertToOpportunity = async (lead) => {
    if (lead.status === 'Convertido') return;
    // simple conversion UI flow: optimistic add
    const newOpp = {
      id: `opp_${Date.now()}`,
      name: lead.name,
      stage: 'Prospectando',
      amount: null,
      accountName: lead.company,
    }
    setOpportunities(prev => [newOpp, ...prev])
    // optionally mark lead as 'Convertido'
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'Convertido' } : l))
    // simulate latency
    await simulateLatency(600)
    // no failure for conversion in this demo
  }

  // Rendering helpers for states
  if (leads === null) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Leads — Carregando...</h1>
          <div className="rounded-md bg-white p-6 shadow-sm">Carregando leads (simulação)...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Leads</h1>
          <div className="text-sm text-gray-600">{leads.length} leads no total • Mostrando {visibleLeads.length} leads</div>
        </header>

        {/* Controls */}
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

        {/* Leads table */}
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
              {visibleLeads.length === 0 ? (
                <tr><td colSpan={7} className="p-6 text-center text-gray-500">Nenhum lead encontrado.</td></tr>
              ) : visibleLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 cursor-pointer" onClick={() => openLead(lead)}>{lead.name}</td>
                  <td className="px-4 py-3">{lead.company}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.source}</td>
                  <td className="px-4 py-3 font-mono">{lead.score}</td>
                  <td className="px-4 py-3">{lead.status}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => convertToOpportunity(lead)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Converter</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Opportunities */}
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

      </div>

      {/* Slide-over panel */}
      {selectedLead && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex-1" onClick={closePanel} />
          <div className="w-full max-w-md bg-white shadow-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                
                <h3 className="text-xl font-semibold"><span className="text-sm text-gray-500">Lead: </span>{selectedLead.name}</h3>
                <p className="text-sm text-gray-500">Empresa: {selectedLead.company}</p>
              </div>
              <button onClick={closePanel} className="text-gray-500 transform rotate-[44deg] text-3xl w-10 h-10 flex items-center justify-center">+</button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="text" value={selectedLead.email} onChange={e => setSelectedLead(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <select value={selectedLead.status} onChange={e => setSelectedLead(prev => ({ ...prev, status: e.target.value }))}
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
                <button disabled={panelState.saving} onClick={() => saveLead(selectedLead)} className="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
                <button disabled={panelState.saving} onClick={closePanel} className="px-4 py-2 border rounded">Cancelar</button>
                <div className="ml-auto">
                  <button onClick={() => convertToOpportunity(selectedLead)} className="px-3 py-1 bg-green-600 text-white rounded">Converter Lead</button>
                </div>
              </div>

              {panelState.saving && <div className="text-sm text-gray-500">Salvando...</div>}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
