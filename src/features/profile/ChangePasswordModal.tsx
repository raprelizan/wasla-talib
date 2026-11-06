import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChangePasswordModal: React.FC = () => {
  const { isPasswordModalOpen, setIsPasswordModalOpen, language, showToast } = useApp();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isPasswordModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword) {
      setError(language === 'ar' ? 'يرجى إدخال كلمة المرور الحالية' : 'Veuillez saisir votre mot de passe actuel');
      return;
    }
    if (newPassword.length < 8) {
      setError(language === 'ar' ? 'كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف' : 'Le nouveau mot de passe doit comporter au moins 8 caractères');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(language === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Les mots de passe ne correspondent pas');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(language === 'ar' ? 'تم تغيير كلمة المرور بنجاح!' : 'Mot de passe modifié avec succès !');
      setIsPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1200);
  };

  const getStrengthText = () => {
    if (newPassword.length === 0) return null;
    if (newPassword.length < 8) return { text: language === 'ar' ? 'قصيرة جداً' : 'Trop court', color: 'text-rose-500', bar: 'w-1/4 bg-rose-500' };
    if (newPassword.length < 10) return { text: language === 'ar' ? 'متوسطة' : 'Moyen', color: 'text-amber-500', bar: 'w-2/4 bg-amber-500' };
    return { text: language === 'ar' ? 'قوية ومحمية' : 'Robuste', color: 'text-teal-500', bar: 'w-full bg-teal-500' };
  };

  const strength = getStrengthText();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {language === 'ar' ? 'تغيير كلمة المرور' : 'Modifier le mot de passe'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {language === 'ar' ? 'حماية حساب الطالب وجلسات الدخول' : 'Sécurité de votre compte'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPasswordModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'ar' ? 'كلمة المرور الحالية' : 'Mot de passe actuel'}
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-3 pl-10 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute top-2.5 left-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'ar' ? 'كلمة المرور الجديدة (8 أحرف على الأقل)' : 'Nouveau mot de passe'}
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-3 pl-10 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute top-2.5 left-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Strength indicator */}
            {strength && (
              <div className="mt-1.5 space-y-1">
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                  <div className={`h-full ${strength.bar} transition-all duration-300`} />
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">
                    {language === 'ar' ? 'قوة كلمة المرور:' : 'Force :'}
                  </span>
                  <span className={`font-semibold ${strength.color}`}>{strength.text}</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirmer le mot de passe'}
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-3 pl-10 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute top-2.5 left-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="py-2 px-3 text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              {language === 'ar' ? 'إلغاء' : 'Annuler'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'حفظ كلمة المرور' : 'Enregistrer'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
