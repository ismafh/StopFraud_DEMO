import React from 'react';
import { ArrowLeft, TrendingUp, MessageCircle, Share2, ThumbsUp, AlertTriangle, BarChart3, ExternalLink, ShieldCheck, DollarSign, Ban, Calendar } from 'lucide-react';

interface FraudEventDetailsProps {
  onBack: () => void;
  eventId: string;
}

const FraudEventDetails: React.FC<FraudEventDetailsProps> = ({ onBack, eventId }) => {
  // Find the event details based on the ID
  const event = fraudEvents.find(e => e.id === eventId);

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
            <h1 className="text-xl font-medium">Análisis de Interacciones</h1>
            <p className="text-sm text-gray-500">#{eventId} - {event.name}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2 space-y-4">
            {/* Event Status */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Estado del Evento</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  event.status === 'Verificado' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {event.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-yellow-700 bg-yellow-50 p-4 rounded-lg">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{event.reportReason}</p>
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

            {/* Fraud Prevention Stats (Only shown for fraudulent events) */}
            {event.status === 'Fraudulento' && event.fraudStats && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Estadísticas de Prevención</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <DollarSign className="w-5 h-5" />
                      <div className="text-sm">Dinero Protegido</div>
                    </div>
                    <div className="text-2xl font-bold text-green-800">{event.fraudStats.moneySaved}€</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                      <Ban className="w-5 h-5" />
                      <div className="text-sm">Transacciones Bloqueadas</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">{event.fraudStats.blockedTransactions}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-700 mb-2">
                      <Calendar className="w-5 h-5" />
                      <div className="text-sm">Última Detección</div>
                    </div>
                    <div className="text-xl font-bold text-purple-800">{event.fraudStats.lastDetectionDate}</div>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-indigo-700 mb-2">
                      <ShieldCheck className="w-5 h-5" />
                      <div className="text-sm">Confianza</div>
                    </div>
                    <div className="text-2xl font-bold text-indigo-800">{event.fraudStats.confidenceScore}%</div>
                  </div>
                </div>
              </div>
            )}

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
          </div>
        </div>
      </main>
    </div>
  );
};

const fraudEvents = [
  {
    id: '1234',
    name: 'Fiesta de Inauguración',
    status: 'Pendiente',
    reportReason: 'Este evento ha sido reportado como duplicado. Se está verificando la autenticidad del organizador.',
    tags: [
      { label: 'Nébula Lounge', type: 'organization', color: 'purple' },
      { label: 'Fiesta', type: 'eventType', color: 'blue' },
      { label: 'Pendiente Revisión', type: 'status', color: 'green' }
    ],
    socialMetrics: {
      'Menciones': '1.2K',
      'Compartidos': '458',
      'Comentarios': '892',
      'Alcance': '15.6K'
    },
    engagementRate: 8.5,
    platformDistribution: {
      'Instagram': 45,
      'Facebook': 30,
      'Twitter': 15,
      'TikTok': 10
    },
    sentimentAnalysis: {
      'positivo': 65,
      'neutral': 25,
      'negativo': 10
    },
    timeline: [
      {
        type: 'share',
        action: 'Compartido masivamente',
        time: 'Hace 2 horas',
        detail: 'Incremento inusual de compartidos en múltiples plataformas',
        platform: 'Instagram'
      },
      {
        type: 'comment',
        action: 'Comentarios sospechosos',
        time: 'Hace 3 horas',
        detail: 'Múltiples comentarios con patrones similares detectados',
        platform: 'Facebook'
      },
      {
        type: 'like',
        action: 'Pico de interacciones',
        time: 'Hace 5 horas',
        detail: 'Aumento repentino de likes en un período corto',
        platform: 'Twitter'
      }
    ]
  },
  {
    id: '1236',
    name: 'Noche de Reggaeton',
    status: 'Fraudulento',
    reportReason: 'Se ha detectado que este evento está utilizando información y materiales promocionales falsos.',
    tags: [
      { label: 'Ritmo Fusion', type: 'organization', color: 'purple' },
      { label: 'Concierto', type: 'eventType', color: 'blue' },
      { label: 'Fraudulento', type: 'status', color: 'green' }
    ],
    socialMetrics: {
      'Menciones': '156',
      'Compartidos': '23',
      'Comentarios': '45',
      'Alcance': '2.1K'
    },
    fraudStats: {
      moneySaved: '12.450',
      blockedTransactions: '156',
      lastDetectionDate: '22 Feb 2025',
      confidenceScore: 98
    },
    engagementRate: 1.2,
    platformDistribution: {
      'Instagram': 35,
      'Facebook': 15,
      'Twitter': 5,
      'TikTok': 2
    },
    sentimentAnalysis: {
      'positivo': 5,
      'neutral': 15,
      'negativo': 80
    },
    timeline: [
      {
        type: 'share',
        action: 'Detección de bots',
        time: 'Hace 1 hora',
        detail: 'Identificados patrones de comportamiento automatizado en compartidos',
        platform: 'Instagram'
      },
      {
        type: 'comment',
        action: 'Reportes de usuarios',
        time: 'Hace 2 horas',
        detail: 'Múltiples usuarios reportan información falsa sobre artistas',
        platform: 'Facebook'
      },
      {
        type: 'like',
        action: 'Actividad sospechosa',
        time: 'Hace 4 horas',
        detail: 'Patrón anormal de likes desde cuentas recién creadas',
        platform: 'Instagram'
      }
    ]
  }
];

export default FraudEventDetails;