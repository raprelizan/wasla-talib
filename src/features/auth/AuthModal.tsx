import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, Phone, User, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authMode,
    openAuthModal,
    language,
    showToast,
    updateUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (authMode === 'register') {
      if (!fullName.trim()) {
        setErrorMessage(language === 'ar' ? 'يرجى إدخال الاسم الكامل' : 'Veuillez saisir votre nom complet');
        return;
      }
      if (password.length < 6) {
        setErrorMessage(language === 'ar' ? 'كلمة المرور يجب أن لا تقل عن 6 أحرف' : 'Le mot de passe doit comporter au moins 6 caractères');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Les mots de passe ne correspondent pas');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage(language === 'ar' ? 'يرجى الموافقة على شروط الاستخدام' : 'Veuillez accepter les conditions d\'utilisation');
        return;
      }
    } else {
      if (activeTab === 'email' && !email.trim()) {
        setErrorMessage(language === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Veuillez saisir votre e-mail');
        return;
      }
      if (activeTab === 'phone' && !phone.trim()) {
        setErrorMessage(language === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Veuillez saisir votre numéro');
        return;
      }
      if (!password) {
        setErrorMessage(language === 'ar' ? 'يرجى إدخال كلمة المرور' : 'Veuillez saisir votre mot de passe');
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (authMode === 'register') {
        updateUser({
          fullName,
          email: email || 'student@univ-dz.edu',
          phone: phone || '0555 12 34 56',
        });
        showToast(language === 'ar' ? 'تم إنشاء الحساب بنجاح! يرجى توثيق بطاقتك الطلابية للاستفادة من المزايا.' : 'Compte créé avec succès !');
      } else {
        showToast(language === 'ar' ? 'مرحباً بعودتك! تم تسجيل الدخول بنجاح.' : 'Connexion réussie !');
      }
      closeAuthModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
              وصلة
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {authMode === 'login'
                ? language === 'ar' ? 'تسجيل الدخول' : 'Connexion'
                : language === 'ar' ? 'إنشاء حساب طالب جديد' : 'Créer un compte'}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto">
          {/* Login tab switcher: Email vs Phone */}
          {authMode === 'login' && (
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'email'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {language === 'ar' ? 'بالبريد الجامعي' : 'Par e-mail'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('phone')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'phone'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {language === 'ar' ? 'برقم الهاتف (05/06/07)' : 'Par téléphone'}
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'ar' ? 'الاسم الكامل (كما في بطاقة الطالب)' : 'Nom et Prénom'}
                </label>
                <div className="relative">
                  <User className="absolute top-2.5 right-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: أسامة مجاهد' : 'ex: Oussama Medjahed'}
                    className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {(authMode === 'register' || (authMode === 'login' && activeTab === 'email')) && (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Adresse e-mail'}
                </label>
                <div className="relative">
                  <Mail className="absolute top-2.5 right-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@univ-alger.dz"
                    className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {(authMode === 'register' || (authMode === 'login' && activeTab === 'phone')) && (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'ar' ? 'رقم الهاتف الجزائري' : 'Numéro de téléphone'}
                </label>
                <div className="relative">
                  <Phone className="absolute top-2.5 right-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0554 12 87 90"
                    className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
              </label>
              <div className="relative">
                <Lock className="absolute top-2.5 right-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-9 pl-10 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2.5 left-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirmer le mot de passe'}
                </label>
                <div className="relative">
                  <Lock className="absolute top-2.5 right-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-9 pl-10 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-2.5 left-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {authMode === 'register' && (
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  {language === 'ar'
                    ? 'أوافق على شروط الاستخدام وسياسة حماية البيانات الطلابية لمنصة وصلة طالب الجزائر.'
                    : 'J\'accepte les conditions d\'utilisation et la politique de confidentialité de WASLA TALIB.'}
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>
                  {authMode === 'login'
                    ? language === 'ar' ? 'تسجيل الدخول' : 'Se connecter'
                    : language === 'ar' ? 'إنشاء حساب جديد' : 'Créer mon compte'}
                </span>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            {authMode === 'login' ? (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {language === 'ar' ? 'ليس لديك حساب بعد؟ ' : 'Pas encore de compte ? '}
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  {language === 'ar' ? 'سجل حساب طالب الآن' : 'Inscrivez-vous'}
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {language === 'ar' ? 'لديك حساب بالفعل؟ ' : 'Vous avez déjà un compte ? '}
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  {language === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
