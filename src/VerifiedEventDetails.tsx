import React from 'react';
import { ArrowLeft, CheckCircle, TrendingUp, MessageCircle, Share2, ThumbsUp, BarChart3, ExternalLink, Shield, DollarSign, Ticket } from 'lucide-react';

interface VerifiedEventDetailsProps {
  onBack: () => void;
  eventId: string;
}

const VerifiedEventDetails: React.FC<VerifiedEventDetailsProps> = ({ onBack, eventId }) => {
  // Find the event details based on the ID
  const event = verifiedEvents.find(e => e.id === eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-medium">Evento Verificado</h1>
            <p className="text-sm text-gray-500">#{eventId} - {event.name}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2 space-y-4">
            {/* Verification Status */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Estado de Verificación</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Verificado
                </span>
              </div>
              <div className="flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">Este evento ha sido verificado y cumple con todos los estándares de calidad y seguridad.</p>
              </div>

              {/* Tags Section */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Etiquetas del Evento</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
            </div>

            {/* Verification Metrics */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Métricas de Verificación</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <div className="text-sm">Dinero Recaudado</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-800">{event.verificationStats.moneyCollected}€</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <Shield className="w-5 h-5" />
                    <div className="text-sm">Puntuación de Confianza</div>
                  </div>
                  <div className="text-2xl font-bold text-green-800">{event.verificationStats.trustScore}%</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-700 mb-2">
                    <Ticket className="w-5 h-5" />
                    <div className="text-sm">Entradas Vendidas</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-800">{event.verificationStats.ticketsSold}</div>
                </div>
              </div>
            </div>

            {/* Social Metrics */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Métricas Sociales</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(event.socialMetrics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-500 text-sm mb-1">{key}</div>
                    <div className="text-2xl font-bold">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interaction Timeline */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Línea de Tiempo de Interacciones</h2>
              <div className="space-y-4">
                {event.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className={`p-2 rounded-lg ${
                      item.type === 'comment' ? 'bg-blue-100' :
                      item.type === 'share' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {item.type === 'comment' ? <MessageCircle className="w-5 h-5" /> :
                       item.type === 'share' ? <Share2 className="w-5 h-5" /> :
                       <ThumbsUp className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.action}</p>
                        <span className="text-sm text-gray-500">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                      {item.platform && (
                        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                          <ExternalLink className="w-4 h-4" />
                          {item.platform}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Timeline */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Proceso de Verificación</h2>
              <div className="space-y-4">
                {event.verificationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{step.title}</p>
                        <span className="text-sm text-gray-500">{step.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Analytics */}
          <div className="space-y-4">
            {/* Engagement Rate */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Tasa de Engagement</h2>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-2">{event.engagementRate}%</div>
              <p className="text-sm text-gray-500">
                Basado en interacciones totales vs. alcance
              </p>
            </div>

            {/* Platform Distribution */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Distribución por Plataforma</h2>
              <div className="space-y-4">
                {Object.entries(event.platformDistribution).map(([platform, percentage]) => (
                  <div key={platform}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{platform}</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Análisis de Sentimiento</h2>
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-3">
                {Object.entries(event.sentimentAnalysis).map(([sentiment, value]) => (
                  <div key={sentiment}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="capitalize">{sentiment}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          sentiment === 'positivo' ? 'bg-green-500' :
                          sentiment === 'neutral' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Score Breakdown */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Desglose de Confianza</h2>
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-4">
                {Object.entries(event.trustMetrics).map(([metric, value]) => (
                  <div key={metric}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{metric}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Summary */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Resumen de Validación</h2>
              <div className="space-y-3">
                {event.validationSummary.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const verifiedEvents = [
  {
    id: '1235',
    name: 'Festival de Música Electrónica',
    tags: [
      { label: 'Ritmo Fusion', type: 'organization', color: 'purple' },
      { label: 'Festival', type: 'eventType', color: 'blue' },
      { label: 'Verificado', type: 'status', color: 'green' }
    ],
    verificationStats: {
      moneyCollected: '45.750',
      trustScore: 98,
      ticketsSold: 1243
    },
    socialMetrics: {
      'Menciones': '5.6K',
      'Compartidos': '2.3K',
      'Comentarios': '1.8K',
      'Alcance': '45.2K'
    },
    engagementRate: 12.5,
    platformDistribution: {
      'Instagram': 45,
      'Facebook': 30,
      'Twitter': 15,
      'TikTok': 10
    },
    sentimentAnalysis: {
      'positivo': 75,
      'neutral': 20,
      'negativo': 5
    },
    timeline: [
      {
        type: 'share',
        action: 'Pico de compartidos',
        time: 'Hace 2 horas',
        detail: 'Alto volumen de compartidos orgánicos en redes sociales',
        platform: 'Instagram'
      },
      {
        type: 'comment',
        action: 'Comentarios positivos',
        time: 'Hace 3 horas',
        detail: 'Alta interacción con comentarios positivos de la comunidad',
        platform: 'Facebook'
      },
      {
        type: 'like',
        action: 'Engagement orgánico',
        time: 'Hace 5 horas',
        detail: 'Crecimiento natural de likes y reacciones positivas',
        platform: 'Twitter'
      }
    ],
    trustMetrics: {
      'Identidad del Organizador': 100,
      'Documentación Legal': 98,
      'Historial de Eventos': 95,
      'Validación de Venue': 100,
      'Verificación de Artistas': 97
    },
    verificationSteps: [
      {
        title: 'Verificación de Identidad',
        time: '10:15 AM',
        description: 'Documentación del organizador validada correctamente'
      },
      {
        title: 'Validación de Venue',
        time: '10:30 AM',
        description: 'Confirmada la disponibilidad y capacidad del local'
      },
      {
        title: 'Verificación de Artistas',
        time: '10:45 AM',
        description: 'Confirmada la participación de todos los artistas anunciados'
      },
      {
        title: 'Revisión de Precios',
        time: '11:00 AM',
        description: 'Estructura de precios verificada y dentro de rangos normales'
      }
    ],
    validationSummary: [
      {
        title: 'Documentación Completa',
        description: 'Todos los permisos y licencias necesarios están en orden'
      },
      {
        title: 'Verificación de Organizador',
        description: 'Historial positivo y credenciales verificadas'
      },
      {
        title: 'Seguridad del Evento',
        description: 'Medidas de seguridad y protocolos verificados'
      },
      {
        title: 'Validación Financiera',
        description: 'Estructura de precios y pagos verificada'
      }
    ]
  }
];

export default VerifiedEventDetails;