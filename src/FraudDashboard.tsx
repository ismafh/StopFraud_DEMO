import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, Search, Filter, Download, MoreVertical, X } from 'lucide-react';
import FraudEventDetails from './FraudEventDetails';
import VerifiedEventDetails from './VerifiedEventDetails';

interface FraudDashboardProps {
  onBack: () => void;
}

interface Tag {
  label: string;
  type: 'organization' | 'eventType';
  color: string;
}

const FraudDashboard: React.FC<FraudDashboardProps> = ({ onBack }) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredReports = selectedTags.length > 0
    ? fraudReports.filter(report => 
        report.tags.some(tag => selectedTags.includes(tag.label))
      )
    : fraudReports;

  if (selectedEventId) {
    const selectedEvent = fraudReports.find(report => report.id === selectedEventId);
    if (selectedEvent?.status === 'Verificado') {
      return <VerifiedEventDetails eventId={selectedEventId} onBack={() => setSelectedEventId(null)} />;
    }
    return <FraudEventDetails eventId={selectedEventId} onBack={() => setSelectedEventId(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-medium">Reportes de Fraude</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por ID o nombre del evento"
                className="pl-10 pr-4 py-2 border rounded-lg bg-white text-sm w-full"
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <button 
                className="px-4 py-2 border rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50 w-full sm:w-auto justify-center sm:justify-start"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filtrar
                {selectedTags.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {selectedTags.length}
                  </span>
                )}
              </button>
              
              {/* Filter Dropdown */}
              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-white rounded-lg shadow-lg border p-4 z-10">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Organizaciones</h3>
                    <div className="space-y-2">
                      {Array.from(new Set(fraudReports.flatMap(r => r.tags)
                        .filter(t => t.type === 'organization')
                        .map(t => t.label)))
                        .map(tag => (
                          <label key={tag} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedTags.includes(tag)}
                              onChange={() => handleTagSelect(tag)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">{tag}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tipo de Evento</h3>
                    <div className="space-y-2">
                      {Array.from(new Set(fraudReports.flatMap(r => r.tags)
                        .filter(t => t.type === 'eventType')
                        .map(t => t.label)))
                        .map(tag => (
                          <label key={tag} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedTags.includes(tag)}
                              onChange={() => handleTagSelect(tag)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">{tag}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="px-4 py-2 border rounded-lg flex items-center gap-2 text-sm w-full sm:w-auto justify-center">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
              >
                {tag}
                <button
                  onClick={() => handleTagSelect(tag)}
                  className="hover:bg-blue-100 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Reports List for Mobile */}
        <div className="block sm:hidden space-y-4">
          {filteredReports.map((report) => (
            <div 
              key={report.id}
              className="bg-white rounded-lg p-4 shadow-sm cursor-pointer"
              onClick={() => setSelectedEventId(report.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{report.event}</div>
                  <div className="text-sm text-gray-500">#{report.id}</div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  report.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  report.status === 'Verificado' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {report.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2">{report.reportDate}</div>
              <div className="text-sm text-gray-600 mb-3">{report.reason}</div>
              <div className="flex flex-wrap gap-1">
                {report.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      tag.type === 'organization' ? 'bg-purple-100 text-purple-800' :
                      tag.type === 'eventType' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reports Table for Desktop */}
        <div className="hidden sm:block bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Reporte</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etiquetas</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr 
                    key={report.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedEventId(report.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.event}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.reportDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        report.status === 'Verificado' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.reason}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {report.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              tag.type === 'organization' ? 'bg-purple-100 text-purple-800' :
                              tag.type === 'eventType' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-gray-400 hover:text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add additional actions menu logic here
                        }}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-3 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              Mostrando 1-5 de 12 resultados
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">
                Anterior
              </button>
              <button className="px-3 py-1 border rounded text-sm bg-gray-50">
                Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <div className="flex items-center gap-3 text-yellow-700 bg-yellow-50 p-4 rounded-lg">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              Los reportes de fraude son revisados en un plazo máximo de 24 horas. Si se determina que es un falso positivo, 
              el evento será restaurado automáticamente.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const fraudReports = [
  {
    id: '1234',
    event: 'Fiesta de Inauguración',
    reportDate: '22 Feb 2025',
    status: 'Pendiente',
    reason: 'Evento duplicado',
    tags: [
      { label: 'Nébula Lounge', type: 'organization', color: 'purple' },
      { label: 'Fiesta', type: 'eventType', color: 'blue' },
      { label: 'Pendiente Revisión', type: 'status', color: 'green' }
    ]
  },
  {
    id: '1235',
    event: 'Festival de Música Electrónica',
    reportDate: '21 Feb 2025',
    status: 'Verificado',
    reason: 'Falso positivo',
    tags: [
      { label: 'Vanguardia Events', type: 'organization', color: 'purple' },
      { label: 'Festival', type: 'eventType', color: 'blue' },
      { label: 'Verificado', type: 'status', color: 'green' }
    ]
  },
  {
    id: '1236',
    event: 'Noche de Reggaeton',
    reportDate: '20 Feb 2025',
    status: 'Fraudulento',
    reason: 'Información falsa',
    tags: [
      { label: 'Ritmo Fusion', type: 'organization', color: 'purple' },
      { label: 'Concierto', type: 'eventType', color: 'blue' },
      { label: 'Fraudulento', type: 'status', color: 'green' }
    ]
  },
  {
    id: '1237',
    event: 'Noche Latina',
    reportDate: '19 Feb 2025',
    status: 'Verificado',
    reason: 'Falso positivo',
    tags: [
      { label: 'Eclipse Venue', type: 'organization', color: 'purple' },
      { label: 'Fiesta', type: 'eventType', color: 'blue' },
      { label: 'Verificado', type: 'status', color: 'green' }
    ]
  },
  {
    id: '1238',
    event: 'Fiesta de Carnaval',
    reportDate: '18 Feb 2025',
    status: 'Pendiente',
    reason: 'Precio sospechoso',
    tags: [
      { label: 'Nébula Lounge', type: 'organization', color: 'purple' },
      { label: 'Fiesta', type: 'eventType', color: 'blue' },
      { label: 'Pendiente Revisión', type: 'status', color: 'green' }
    ]
  }
];

export default FraudDashboard;