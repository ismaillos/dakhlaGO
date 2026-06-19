import { useCart } from '../hooks/useCart';
import { WHATSAPP_NUMBER } from '../data/products';

export default function OrderModal() {
  const { items, modalOpen, closeModal, removeItem, total, clearCart } = useCart();

  if (!modalOpen || items.length === 0) return null;

  const buildWhatsAppMessage = () => {
    let text = `Bonjour Dakhla Artisanal!\n\nJe souhaite commander:\n`;
    items.forEach((item, i) => {
      text += `\n${i + 1}. ${item.product.name}`;
      if (item.quantity > 1) text += ` (x${item.quantity})`;
      text += ` - ${item.product.price * item.quantity} DH`;
    });
    text += `\n\n*Total: ${total} DH*`;
    text += `\n\nMerci!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleConfirm = () => {
    window.open(buildWhatsAppMessage(), '_blank');
    clearCart();
    closeModal();
  };

  const handleAddMore = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />

      {/* Modal */}
      <div className="relative bg-[#141414] gold-border rounded-3xl w-full max-w-[480px] max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Votre Commande</h3>
              <p className="text-[12px] text-white/40 mt-1">Resume de votre panier</p>
            </div>
            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="p-6 space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="flex gap-4 bg-white/[0.02] rounded-xl p-3">
              <img
                src={item.product.img}
                alt={item.product.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate">{item.product.name}</h4>
                <p className="text-[11px] text-white/30">{item.product.catLabel}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#E8732F] font-bold">
                    {item.product.price * item.quantity} DH
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-white/40">x{item.quantity}</span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-white/20 hover:text-red-400 transition-colors text-[11px]"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="px-6 py-4 border-t border-white/[0.06]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-white/40 text-sm">Sous-total</span>
            <span className="text-white/60 text-sm">{total} DH</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-white/40 text-sm">Livraison</span>
            <span className="text-[#5B7B5E] text-sm">Gratuite</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/[0.06] mt-3">
            <span className="text-lg font-bold">Total</span>
            <span className="text-[#E8732F] text-2xl font-extrabold">{total} DH</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-2 space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#E8732F] text-white py-4 rounded-full font-bold text-sm hover:bg-[#d46726] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Confirmer sur WhatsApp
          </button>
          <button
            onClick={handleAddMore}
            className="w-full border border-white/15 text-white/60 py-3.5 rounded-full font-semibold text-sm hover:border-[#E8732F] hover:text-[#E8732F] transition-colors"
          >
            + Ajouter d&apos;autres produits
          </button>
        </div>

        {/* Footer note */}
        <div className="px-6 pb-4 text-center">
          <p className="text-[10px] text-white/20">
            Livraison partout au Maroc • Paiement a la livraison
          </p>
        </div>
      </div>
    </div>
  );
}
