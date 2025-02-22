import React from 'react';
import { 
  ArrowLeft, 
  Filter, 
  Upload, 
  PieChart, 
  ArrowRight, 
  MoreVertical,
  ShoppingCart 
} from 'lucide-react';

interface WalletDashboardProps {
  onBack: () => void;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-medium">Saldo actual</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Actions */}
        <div className="flex justify-end gap-2 mb-6">
          <button className="px-4 py-2 bg-[#4285f4] text-white rounded-lg flex items-center gap-2 text-sm">
            <Upload className="w-4 h-4" />
            Enviar dinero
          </button>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2 text-sm">
            <PieChart className="w-4 h-4" />
            Resumen
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-bold mb-4">3.000€</h2>
          <div className="text-sm text-gray-500">Febrero</div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg p-4 mb-6">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center py-4 border-b border-gray-100 last:border-b-0">
              <div className="bg-gray-100 rounded-full p-3">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{transaction.title}</h3>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                    <p className="text-xs text-gray-400">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-500">{transaction.amount}</p>
                    <p className="text-sm text-gray-500">{transaction.balance}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Summary */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-medium">FEBRERO 2025</h2>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 text-sm">
            {summaryItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.label}</span>
                <span className={item.amount.includes('-') ? 'text-red-500' : ''}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg p-4 space-y-6">
          <div>
            <h3 className="font-medium mb-2">¿Qué es el monedero?</h3>
            <p className="text-sm text-gray-600">
              Todo lo que ingresas y los gastos, aquí los tienes. Tranquilo esto solamente lo puedes ver tú, administración y contabilidad.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">¿Cuándo se actualiza?</h3>
            <p className="text-sm text-gray-600">
              Cada madrugada.<br />
              Por eso, si quieres consultar los movimientos de hoy, vuelve mañana y tendrás todos.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Conceptos:</h3>
            <dl className="text-sm space-y-2">
              <dt className="font-medium">Saldo actual:</dt>
              <dd className="text-gray-600">Movimientos positivos menos los negativos (€ positivo - € negativo)</dd>
              
              <dt className="font-medium">Retenido:</dt>
              <dd className="text-gray-600">El importe procesado de eventos/días futuros + importe total devoluciones hechas en el día en que se consulta. (€ eventos/días futuros + € devoluciones procesadas hoy)</dd>
              
              <dt className="font-medium">Disponible para retirar:</dt>
              <dd className="text-gray-600">€ Saldo actual - € retenido</dd>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
};

const transactions = [
  {
    title: 'Servicios de ventas',
    description: 'SMS + WhatsApp + Venta impresa',
    date: '21 de Febrero de 2025',
    amount: '-0,18 €',
    balance: '-2.732,91 €'
  },
  {
    title: 'Servicios de ventas',
    description: 'SMS + WhatsApp + Venta impresa',
    date: '20 de Febrero de 2025',
    amount: '-5,26 €',
    balance: '-2.732,73 €'
  },
  {
    title: 'Servicios de ventas',
    description: 'SMS + WhatsApp + Venta impresa',
    date: '15 de Febrero de 2025',
    amount: '-0,91 €',
    balance: '-2.727,47 €'
  },
  {
    title: 'Disputas',
    description: 'Cantidad perdida',
    date: '6 de Febrero de 2025',
    amount: '-200 €',
    balance: '-2.723,29 €'
  }
];

const summaryItems = [
  { label: 'Pasarela de pago', amount: '0 €' },
  { label: 'Servicios de ventas', amount: '-11,62 €' },
  { label: 'Marketing', amount: '0 €' },
  { label: 'Suscripciones', amount: '0 €' },
  { label: 'Otros servicios', amount: '0 €' },
  { label: 'Disputas', amount: '-1.500 €' },
  { label: 'Ingreso', amount: '0 €' },
  { label: 'Traspaso', amount: '0 €' },
  { label: 'Retirada', amount: '0 €' },
  { label: 'Amortización', amount: '0 €' }
];

export default WalletDashboard;