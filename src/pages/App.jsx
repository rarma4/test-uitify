import React, { useEffect, useMemo, useState } from 'react'
import leadsData from '../leads.json'
import LeadTable from '../components/LeadTable'
import LeadFilters from '../components/LeadFilters'
import OpportunitiesTable from '../components/OpportunitiesTable'
import LeadDetailPanel from '../components/LeadDetailPanel'
import { simulateLatency, isValidEmail } from '../utils/leads'

const LS_KEY = 'leads-mvp:v1'

export default function App() {
  // State
  const [leads, setLeads] = useState(null)
  const [opportunities, setOpportunities] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [sortByScoreDesc, setSortByScoreDesc] = useState(true)
  const [selectedLead, setSelectedLead] = useState(null)
  const [panelState, setPanelState] = useState({ saving: false, error: null })

  // Persisted controls
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setSearch(parsed.search || '')
        setStatusFilter(parsed.statusFilter || 'Todos')
        setSortByScoreDesc(parsed.sortByScoreDesc ?? true)
      } catch (e) {}
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ search, statusFilter, sortByScoreDesc }))
  }, [search, statusFilter, sortByScoreDesc])

  // Load leads
  useEffect(() => {
    let mounted = true
    setLeads(null)
    simulateLatency(800).then(() => {
      if (!mounted) return
      setLeads(leadsData.map(l => ({ ...l })))
    })
    return () => { mounted = false }
  }, [])

  // Derived
  const visibleLeads = useMemo(() => {
    if (!leads) return []
    const s = search.trim().toLowerCase()
    let out = leads.filter(l => {
      if (statusFilter !== 'Todos' && l.status !== statusFilter) return false
      if (!s) return true
      return l.name.toLowerCase().includes(s) || l.company.toLowerCase().includes(s)
    })
    out.sort((a, b) => (sortByScoreDesc ? b.score - a.score : a.score - b.score))
    return out
  }, [leads, search, statusFilter, sortByScoreDesc])

  // Actions
  const openLead = (lead) => {
    setSelectedLead({ ...lead })
    setPanelState({ saving: false, error: null })
  }
  const closePanel = () => {
    setSelectedLead(null)
    setPanelState({ saving: false, error: null })
  }
  const handleLeadChange = (updated) => setSelectedLead(updated)
  const saveLead = async (updated) => {
    if (!isValidEmail(updated.email)) {
      setPanelState({ saving: false, error: 'Formato de e-mail inválido.' })
      return
    }
    setLeads(prev => prev.map(l => l.id === updated.id ? { ...l, ...updated } : l))
    setPanelState({ saving: true, error: null })
    await simulateLatency(900)
    const failed = Math.random() < 0.25
    if (failed) {
      setLeads(prev => prev.map(l => l.id === updated.id ? leadsData.find(s => s.id === l.id) || l : l))
      setPanelState({ saving: false, error: 'Falha ao salvar (simulada). Alterações revertidas.' })
      return
    }
    setPanelState({ saving: false, error: null })
    setSelectedLead(null)
  }
  const convertToOpportunity = async (lead) => {
    if (lead.status === 'Convertido') return
    const newOpp = {
      id: `opp_${Date.now()}`,
      name: lead.name,
      stage: 'Prospectando',
      amount: null,
      accountName: lead.company,
    }
    setOpportunities(prev => [newOpp, ...prev])
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'Convertido' } : l))
    await simulateLatency(600)
  }

  // Loading state
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

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Leads</h1>
          <div className="text-sm text-gray-600">{leads.length} leads no total • Mostrando {visibleLeads.length} leads</div>
        </header>
        <LeadFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortByScoreDesc={sortByScoreDesc}
          setSortByScoreDesc={setSortByScoreDesc}
        />
        <LeadTable
          leads={visibleLeads}
          onOpenLead={openLead}
          onConvert={convertToOpportunity}
        />
        <OpportunitiesTable opportunities={opportunities} />
        <LeadDetailPanel
          lead={selectedLead}
          panelState={panelState}
          onClose={closePanel}
          onSave={saveLead}
          onConvert={convertToOpportunity}
          onChange={handleLeadChange}
        />
      </div>
    </div>
  )
}
