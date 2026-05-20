import React, { useState, useEffect } from 'react';
import { CreditCard, Shield, CheckCircle2, X, Loader2, IndianRupee, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const RazorpayPayment = ({ amount, packageName, onSuccess, onCancel }) => {
  const { isDarkMode } = useTheme();
  const [step, setStep] = useState('init'); // init, processing, success
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [countdown, setCountdown] = useState(3);

  const handlePay = async (e) => {
    e.preventDefault();
    setStep('processing');
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 3000));
    setStep('success');
  };

  useEffect(() => {
    if (step === 'success') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onSuccess && onSuccess({
              paymentId: 'pay_' + Math.random().toString(36).substr(2, 14),
              orderId: 'order_' + Math.random().toString(36).substr(2, 14),
              method: paymentMethod,
              amount,
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const bg = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const text = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const textSub = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const input = isDarkMode
    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400';
  const tabActive = 'bg-[#FF385C] text-white shadow-md';
  const tabInactive = isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';

  if (step === 'success') {
    return (
      <div className="razorpay-backdrop" onClick={e => e.stopPropagation()}>
        <div className={`${bg} rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl`}>
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className={`text-2xl font-extrabold ${text} mb-2`}>Payment Successful!</h2>
          <p className={`${textSub} mb-4`}>Your booking for <strong>{packageName}</strong> has been confirmed.</p>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4 mb-4 text-left space-y-2`}>
            <div className="flex justify-between">
              <span className={textSub}>Amount Paid</span>
              <span className={`font-bold ${text}`}>₹{Number(amount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className={textSub}>Payment ID</span>
              <span className={`font-mono text-xs ${text}`}>pay_demo_{Math.random().toString(36).substr(2, 8)}</span>
            </div>
            <div className="flex justify-between">
              <span className={textSub}>Status</span>
              <span className="text-green-500 font-bold">✓ Captured</span>
            </div>
          </div>
          <p className={`text-sm ${textSub}`}>Redirecting in {countdown}s...</p>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="razorpay-backdrop" onClick={e => e.stopPropagation()}>
        <div className={`${bg} rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl`}>
          <Loader2 className="w-12 h-12 text-[#FF385C] animate-spin mx-auto mb-4" />
          <h2 className={`text-xl font-bold ${text} mb-2`}>Processing Payment</h2>
          <p className={`${textSub} text-sm`}>Please wait while we securely process your payment...</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Lock className="w-3 h-3" /> Secured by Razorpay (Test Mode)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="razorpay-backdrop" onClick={onCancel}>
      <div className={`${bg} rounded-2xl max-w-md w-full mx-4 shadow-2xl overflow-hidden`} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#072654] to-[#2B5CE6] p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-[#2B5CE6] font-extrabold text-sm">R</span>
              </div>
              <span className="font-bold text-lg">Razorpay</span>
              <span className="text-[10px] bg-yellow-400 text-gray-900 px-1.5 py-0.5 rounded font-bold uppercase">Test</span>
            </div>
            <button onClick={onCancel} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-blue-200 text-sm">Paying for: {packageName}</p>
          <p className="text-3xl font-extrabold mt-1">₹{Number(amount).toLocaleString('en-IN')}</p>
        </div>

        {/* Payment Methods */}
        <div className="p-5">
          <div className="flex gap-2 mb-5">
            {[
              { id: 'upi', label: 'UPI' },
              { id: 'card', label: 'Card' },
              { id: 'netbanking', label: 'Net Banking' },
            ].map(m => (
              <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${paymentMethod === m.id ? tabActive : tabInactive}`}>
                {m.label}
              </button>
            ))}
          </div>

          <form onSubmit={handlePay}>
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-bold ${text} mb-1.5`}>UPI ID</label>
                  <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi"
                    className={`w-full px-4 py-3 rounded-xl ${input} border text-sm font-medium focus:ring-2 focus:ring-[#2B5CE6]/30 focus:border-[#2B5CE6] outline-none transition`} required />
                </div>
                <div className={`p-3 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-blue-50 text-blue-700'}`}>
                  💡 For testing, use any UPI ID like <strong>success@upi</strong>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-bold ${text} mb-1.5`}>Card Number</label>
                  <input value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim())}
                    placeholder="4111 1111 1111 1111" maxLength={19}
                    className={`w-full px-4 py-3 rounded-xl ${input} border text-sm font-mono focus:ring-2 focus:ring-[#2B5CE6]/30 focus:border-[#2B5CE6] outline-none transition`} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-sm font-bold ${text} mb-1.5`}>Expiry</label>
                    <input value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/YY" maxLength={5}
                      className={`w-full px-4 py-3 rounded-xl ${input} border text-sm font-mono focus:ring-2 focus:ring-[#2B5CE6]/30 focus:border-[#2B5CE6] outline-none transition`} required />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold ${text} mb-1.5`}>CVV</label>
                    <input type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="•••" maxLength={3}
                      className={`w-full px-4 py-3 rounded-xl ${input} border text-sm font-mono focus:ring-2 focus:ring-[#2B5CE6]/30 focus:border-[#2B5CE6] outline-none transition`} required />
                  </div>
                </div>
                <div className={`p-3 rounded-lg text-xs ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-blue-50 text-blue-700'}`}>
                  💡 Use test card: <strong>4111 1111 1111 1111</strong>, any future expiry, any CVV
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-3">
                {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map(bank => (
                  <label key={bank} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${isDarkMode ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="bank" className="accent-[#2B5CE6]" defaultChecked={bank === 'State Bank of India'} />
                    <span className={`text-sm font-medium ${text}`}>{bank}</span>
                  </label>
                ))}
              </div>
            )}

            <button type="submit"
              className="w-full mt-5 bg-gradient-to-r from-[#2B5CE6] to-[#072654] hover:from-[#1a4fd4] hover:to-[#061e45] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> Pay ₹{Number(amount).toLocaleString('en-IN')}
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
            <Shield className="w-3 h-3" /> 100% Secure Payment · Powered by Razorpay (Demo)
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayPayment;
