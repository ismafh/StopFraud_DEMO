import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface EventCreatedSuccessProps {
  onBack: () => void;
}

const EventCreatedSuccess: React.FC<EventCreatedSuccessProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-medium">Evento creado</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="max-w-lg mx-auto mt-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">¡Evento creado con éxito!</h2>
            <p className="text-gray-600 mb-4">
              Tu evento está siendo procesado y será publicado en breve.
            </p>
            <p className="text-gray-600 mb-6">
              Recibirás un correo electrónico con el enlace directo a tu evento
              una vez que esté publicado.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">
                  El proceso de publicación puede tardar unos minutos.
                </p>
                <p className="text-sm text-gray-500">
                  Si no recibes el correo, revisa tu carpeta de spam.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <button 
                onClick={onBack}
                className="w-full bg-[#4285f4] text-white px-6 py-3 rounded-lg hover:bg-[#3b77db] transition-colors"
              >
                Volver al calendario
              </button>
              <button className="w-full border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Ver detalles del evento
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventCreatedSuccess;