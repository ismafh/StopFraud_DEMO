import React from 'react';
import { FileText, Smartphone, Tag, Shield, CreditCard, Receipt, Wallet, FileInput as FileInvoice, Percent, Megaphone, Lightbulb, ArrowLeft, AlertTriangle } from 'lucide-react';

interface SettingsDashboardProps {
  onBack: () => void;
  onWalletClick: () => void;
  onFraudDashboardClick: () => void;
}

const SettingsDashboard: React.FC<SettingsDashboardProps> = ({ onBack, onWalletClick, onFraudDashboardClick }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-medium">Ajustes</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Ventas Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#fff1f3] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <FileText className="w-5 h-5" />
                <h3 className="font-medium">Plantillas para PDF</h3>
              </div>
              <p className="text-sm text-gray-600">Selecciona una plantilla para los PDF de tus ventas.</p>
            </div>

            <div className="bg-[#fff1f3] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <Smartphone className="w-5 h-5" />
                <h3 className="font-medium">Diseños Wallet iOS</h3>
              </div>
              <p className="text-sm text-gray-600">Crea diseños para Wallet iOS y asígnalos a las entradas y los pases de tus eventos.</p>
            </div>

            <div className="bg-[#fff1f3] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <Tag className="w-5 h-5" />
                <h3 className="font-medium">Etiquetas para listas</h3>
              </div>
              <p className="text-sm text-gray-600">Gestiona y personaliza las etiquetas de tus listas.</p>
            </div>

            <div className="bg-[#fff1f3] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <Shield className="w-5 h-5" />
                <h3 className="font-medium">Dispositivos de acceso</h3>
              </div>
              <p className="text-sm text-gray-600">Gestiona los dispositivos que usarán Fourvenues Access para recepcionar ventas.</p>
            </div>

            <div className="bg-[#fff1f3] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <CreditCard className="w-5 h-5" />
                <h3 className="font-medium">Sistema Cashless</h3>
              </div>
              <p className="text-sm text-gray-600">Configura dispositivos cashless para ofrecer una experiencia de pago ágil y sin efectivo.</p>
            </div>

            <button 
              onClick={onFraudDashboardClick}
              className="bg-[#fff1f3] p-4 rounded-lg text-left hover:bg-[#ffe4e8] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-medium">Reportes de Fraude</h3>
              </div>
              <p className="text-sm text-gray-600">Gestiona y revisa los eventos reportados como posible fraude.</p>
            </button>
          </div>
        </div>

        {/* Finanzas Section */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Finanzas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={onWalletClick}
              className="bg-[#e8fff7] p-4 rounded-lg text-left hover:bg-[#d3fff0] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#00c781] mb-4">
                <Wallet className="w-5 h-5" />
                <h3 className="font-medium">Monedero</h3>
              </div>
              <p className="text-sm text-gray-600">Visualiza las ventas realizadas a través de la pasarela de pago.</p>
            </button>

            <div className="bg-[#e8fff7] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#00c781] mb-4">
                <Receipt className="w-5 h-5" />
                <h3 className="font-medium">Facturas</h3>
              </div>
              <p className="text-sm text-gray-600">Consulta y descarga las facturas de nuestros servicios.</p>
            </div>

            <div className="bg-[#e8fff7] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#00c781] mb-4">
                <Wallet className="w-5 h-5" />
                <h3 className="font-medium">Monedero BNK</h3>
              </div>
              <p className="text-sm text-gray-600">Visualiza las ventas realizadas a través de la pasarela de pago.</p>
            </div>

            <div className="bg-[#e8fff7] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#00c781] mb-4">
                <FileInvoice className="w-5 h-5" />
                <h3 className="font-medium">Módulo de facturación</h3>
              </div>
              <p className="text-sm text-gray-600">Emite facturas y envíalas automáticamente a las agencias tributarias de tu régimen.</p>
            </div>

            <div className="bg-[#e8fff7] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#00c781] mb-4">
                <Receipt className="w-5 h-5" />
                <h3 className="font-medium">Módulo de InvoiceXpress</h3>
              </div>
              <p className="text-sm text-gray-600">Habilita el módulo de InvoiceXpress para autofacturar las ventas para los clientes de Portugal.</p>
            </div>

            <div className="bg-[#e8fff7] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#00c781] mb-4">
                <Percent className="w-5 h-5" />
                <h3 className="font-medium">Gestión de comisiones</h3>
              </div>
              <p className="text-sm text-gray-600">Administra y valida las comisiones generadas por las ventas.</p>
            </div>
          </div>
        </div>

        {/* Servicios adicionales Section */}
        <div>
          <h2 className="text-xl font-medium mb-4">Servicios adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#fff1f3] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <Megaphone className="w-5 h-5" />
                <h3 className="font-medium">Marketing</h3>
              </div>
              <p className="text-sm text-gray-600">Optimiza tus campañas y aumenta las ventas con nuestras herramientas de marketing.</p>
            </div>

            <div className="bg-[#fff1f3] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <Shield className="w-5 h-5" />
                <h3 className="font-medium">Seguros</h3>
              </div>
              <p className="text-sm text-gray-600">Contrata pólizas de seguro para proteger tus eventos con Fourvenues.</p>
            </div>

            <div className="bg-[#fff1f3] p-4 rounded-lg">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-4">
                <Lightbulb className="w-5 h-5" />
                <h3 className="font-medium">Energía</h3>
              </div>
              <p className="text-sm text-gray-600">Gestiona los servicios de luz y gas para tus eventos a través de Fourvenues.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsDashboard;