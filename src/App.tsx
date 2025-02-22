import React, { useState } from 'react';
import { Calendar, Users, Settings, ShoppingBag, BarChart3, Search, MoreVertical, Clock, User, AlertTriangle, Home, LogOut, TrendingUp, DollarSign, Ticket, Star } from 'lucide-react';
import WalletDashboard from './WalletDashboard';
import SettingsDashboard from './SettingsDashboard';
import EventCreatedSuccess from './EventCreatedSuccess';
import FraudDashboard from './FraudDashboard';

function App() {
  const [currentView, setCurrentView] = useState<'events' | 'settings' | 'wallet' | 'eventSuccess' | 'fraud'>('events');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (currentView === 'wallet') {
    return <WalletDashboard onBack={() => setCurrentView('events')} />;
  }

  if (currentView === 'settings') {
    return <SettingsDashboard 
      onBack={() => setCurrentView('events')} 
      onWalletClick={() => setCurrentView('wallet')}
      onFraudDashboardClick={() => setCurrentView('fraud')}
    />;
  }

  if (currentView === 'eventSuccess') {
    return <EventCreatedSuccess onBack={() => setCurrentView('events')} />;
  }

  if (currentView === 'fraud') {
    return <FraudDashboard onBack={() => setCurrentView('events')} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-[#ff6934] rounded-full p-2 flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            {!isSidebarCollapsed && <h1 className="text-xl font-medium">Eventos</h1>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-[#fff5d1] rounded-lg flex items-center gap-3">
              <Home className="w-5 h-5" />
              {!isSidebarCollapsed && <span>Inicio</span>}
            </button>
            <button className="w-full px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5" />
              {!isSidebarCollapsed && <span>Calendario</span>}
            </button>
            <button className="w-full px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-gray-600">
              <Users className="w-5 h-5" />
              {!isSidebarCollapsed && <span>CRM</span>}
            </button>
            <button className="w-full px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-gray-600">
              <ShoppingBag className="w-5 h-5" />
              {!isSidebarCollapsed && <span>POS</span>}
            </button>
            <button className="w-full px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-gray-600">
              <BarChart3 className="w-5 h-5" />
              {!isSidebarCollapsed && <span>Ventas</span>}
            </button>
            <button 
              onClick={() => setCurrentView('fraud')}
              className="w-full px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-gray-600"
            >
              <AlertTriangle className="w-5 h-5" />
              {!isSidebarCollapsed && <span>Fraude</span>}
            </button>
            <button 
              onClick={() => setCurrentView('settings')}
              className="w-full px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-3 text-gray-600"
            >
              <Settings className="w-5 h-5" />
              {!isSidebarCollapsed && <span>Ajustes</span>}
            </button>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1">
                <div className="font-medium text-sm">John Doe</div>
                <div className="text-xs text-gray-500">Administrador</div>
              </div>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Collapse Button (Desktop only) */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden lg:block absolute top-1/2 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-sm"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar"
                className="pl-10 pr-4 py-2 border rounded-lg bg-[#f8f9fb] text-sm w-full"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Users className="w-5 h-5" />
              </button>
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  1
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Clock className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Statistics Dashboard */}
        <div className="p-4 lg:p-6">
          <h2 className="text-xl lg:text-2xl font-bold mb-6">Panel de Control</h2>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Ventas Totales</h3>
                  <p className="text-2xl font-bold">€45,850</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-500">+12.5%</span>
                <span className="text-gray-500 ml-2">vs mes anterior</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Ticket className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Entradas Vendidas</h3>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-500">+8.3%</span>
                <span className="text-gray-500 ml-2">vs mes anterior</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Asistentes</h3>
                  <p className="text-2xl font-bold">856</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-500">+15.2%</span>
                <span className="text-gray-500 ml-2">vs mes anterior</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Satisfacción</h3>
                  <p className="text-2xl font-bold">4.8/5</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-500">+0.3</span>
                <span className="text-gray-500 ml-2">vs mes anterior</span>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

interface Tag {
  label: string;
  type: 'organization' | 'eventType' | 'status';
  color: string;
}

interface EventCardProps {
  image: string;
  date: string;
  month: string;
  time: string;
  title: string;
  promoter?: string;
  stats?: {
    lists?: number;
    entries?: number;
    reservations?: number;
    passes?: number;
  };
  tags: Tag[];
}

function EventCard({ image, date, month, time, title, promoter, stats, tags }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded-md">
          <div className="text-xs">VIE.</div>
          <div className="text-xl font-bold">{date}</div>
          <div className="text-xs">{month}</div>
        </div>
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{time}</span>
          {promoter && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{promoter}</span>}
        </div>
        <h3 className="text-lg font-medium mb-3">{title}</h3>
        
        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
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
        
        {stats && (
          <div className="flex items-center justify-between text-xs">
            {stats.lists !== undefined && (
              <div>
                <div className="text-gray-500">LISTAS</div>
                <div className="font-medium">{stats.lists}</div>
              </div>
            )}
            {stats.entries !== undefined && (
              <div>
                <div className="text-gray-500">ENTRADAS</div>
                <div className="font-medium">{stats.entries}</div>
              </div>
            )}
            {stats.reservations !== undefined && (
              <div>
                <div className="text-gray-500">RESERVAS</div>
                <div className="font-medium">{stats.reservations}</div>
              </div>
            )}
            {stats.passes !== undefined && (
              <div>
                <div className="text-gray-500">PASES</div>
                <div className="font-medium">{stats.passes}</div>
              </div>
            )}
          </div>
        )}
        <button className="mt-3 w-full py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 text-sm">
          <User className="w-4 h-4" />
          <span>Nuevo cliente</span>
        </button>
      </div>
    </div>
  );
}

const events = [
  {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    date: "22",
    month: "FEB",
    time: "0:00 - 7:30",
    title: "Fiesta de Inauguración",
    stats: {
      lists: 7,
      entries: 0,
      reservations: 0
    },
    tags: [
      { label: 'Nébula Lounge', type: 'organization', color: 'purple' },
      { label: 'Fiesta', type: 'eventType', color: 'blue' },
      { label: 'Nuevo', type: 'status', color: 'green' }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    date: "28",
    month: "FEB",
    time: "12:00 - 6:30",
    title: "Noche de Reggaeton",
    promoter: "PROMOTORA EVENTOS",
    stats: {
      lists: 75,
      entries: 94,
      reservations: 18,
      passes: 956
    },
    tags: [
      { label: 'Eclipse Venue', type: 'organization', color: 'purple' },
      { label: 'Concierto', type: 'eventType', color: 'blue' },
      { label: 'Destacado', type: 'status', color: 'green' }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=800",
    date: "28",
    month: "FEB",
    time: "0:00 - 7:30",
    title: "Festival de Música Electrónica",
    stats: {
      lists: 1,
      entries: 0,
      reservations: 12,
      passes: 1
    },
    tags: [
      { label: 'Ritmo Fusion', type: 'organization', color: 'purple' },
      { label: 'Festival', type: 'eventType', color: 'blue' }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
    date: "28",
    month: "FEB",
    time: "0:00 - 7:30",
    title: "Noche de Hip Hop",
    stats: {
      entries: 0
    },
    tags: [
      { label: 'Urban Club', type: 'organization', color: 'purple' },
      { label: 'Concierto', type: 'eventType', color: 'blue' }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    date: "28",
    month: "FEB",
    time: "0:00 - 7:30",
    title: "Fiesta Latina",
    stats: {
      entries: 2
    },
    tags: [
      { label: 'Salsa Club', type: 'organization', color: 'purple' },
      { label: 'Fiesta', type: 'eventType', color: 'blue' }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
    date: "28",
    month: "FEB",
    time: "1:00 - 8:15",
    title: "Noche Internacional",
    stats: {
      entries: 5,
      reservations: 0
    },
    tags: [
      { label: 'Global Events', type: 'organization', color: 'purple' },
      { label: 'Internacional', type: 'eventType', color: 'blue' }
    ]
  }
];

export default App;