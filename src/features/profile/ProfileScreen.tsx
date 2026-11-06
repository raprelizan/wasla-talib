import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  MapPin,
  Settings,
  Shield,
  Lock,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Globe,
  Moon,
  Sun,
  Bell,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Save,
  Plus,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SavedLocation } from '../../types';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    updateUser,
    language,
    setLanguage,
    theme,
    toggleTheme,
    setIsVerificationModalOpen,
    setIsPasswordModalOpen,
    setIsPrivacyModalOpen,
    openAuthModal,
    showToast,
  } = useApp();

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [fullNameInput, setFullNameInput] = useState(user.fullName);
  const [phoneInput, setPhoneInput] = useState(user.phone);
  const [emailInput, setEmailInput] = useState(user.email);

  // Saved locations
  const [savedLocs, setSavedLocs] = useState<SavedLocation[]>(user.savedLocations);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocTitle, setNewLocTitle] = useState('');
  const [newLocAddress, setNewLocAddress] = useState('');

  const handleSavePersonal = () => {
    updateUser({
      fullName: fullNameInput,
      phone: phoneInput,
      email: emailInput,
    });
    setIsEditingPersonal(false);
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocTitle.trim() || !newLocAddress.trim()) return;
    const newLoc: SavedLocation = {
      id: `loc_${Date.now()}`,
      titleAr: newLocTitle,
      titleFr: newLocTitle,
      titleEn: newLocTitle,
      addressAr: newLocAddress,
      type: 'custom',
    };
    const updated = [...savedLocs, newLoc];
    setSavedLocs(updated);
    updateUser({ savedLocations: updated });
    setNewLocTitle('');
    setNewLocAddress('');
    setIsAddingLocation(false);
    showToast(language === 'ar' ? 'تمت إضافة الموقع بنجاح' : 'Lieu ajouté');
  };

  const handleDeleteLocation = (id: string) => {
    const updated = savedLocs.filter((l) => l.id !== id);
    setSavedLocs(updated);
    updateUser({ savedLocations: updated });
    showToast(language === 'ar' ? 'تم حذف الموقع' : 'Lieu supprimé');
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      {/* 1. Header Profile Banner & Avatar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.fullName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 shadow-sm"
              />
              <button
                onClick={() => showToast(language === 'ar' ? 'تغيير الصورة الرمزية' : 'Modifier la photo')}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center border-2 border-white dark:border-slate-900"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {user.fullName}
                </h2>
                {user.verificationStatus === 'verified' && (
                  <span title="طالب موثق ومعتمد">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
              <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                {user.universityNameAr}
              </p>
            </div>
          </div>

          {/* Verification Status Trigger Pill */}
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className={`p-3 rounded-xl border text-right transition-colors ${
              user.verificationStatus === 'verified'
                ? 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800'
                : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
            }`}
          >
            <span className="text-[10px] block opacity-80">
              {language === 'ar' ? 'حالة التوثيق الطلابي:' : 'Statut étudiant :'}
            </span>
            <span className="text-xs font-bold flex items-center gap-1 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>
                {user.verificationStatus === 'verified' && (language === 'ar' ? 'طالب جامعي معتمد 🎓' : 'Étudiant validé')}
                {user.verificationStatus === 'pending' && (language === 'ar' ? 'قيد المراجعة الأكاديمية' : 'En vérification')}
                {user.verificationStatus === 'unverified' && (language === 'ar' ? 'انقر للتوثيق والاستفادة' : 'Vérifier la carte')}
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* 2. Academic Information (Verified Identity) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              {language === 'ar' ? 'البيانات الأكاديمية المعتمدة' : 'Informations Académiques'}
            </h3>
          </div>
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">
            {language === 'ar' ? 'بيانات مؤكدة برقم التسجيل' : 'Données certifiées'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المؤسسة الجامعية:' : 'Université :'}</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{user.universityNameAr}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'رقم التسجيل الجامعي (Matricule):' : 'Matricule :'}</span>
            <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{user.studentCardId}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الكلية والقسم:' : 'Faculté :'}</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{user.facultyAr} · {user.departmentAr}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المستوى الدراسي الحالي:' : 'Niveau :'}</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{user.studyLevelAr}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 sm:col-span-2">
            <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'النطاق الجغرافي والإقامة:' : 'Wilaya & Commune :'}</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{user.wilayaNameAr} — بلدية {user.municipalityNameAr}</span>
          </div>
        </div>
      </div>

      {/* 3. Personal Contact Information (Editable) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              {language === 'ar' ? 'معلومات الاتصال والحساب' : 'Coordonnées personnelles'}
            </h3>
          </div>
          <button
            onClick={() => {
              if (isEditingPersonal) handleSavePersonal();
              else setIsEditingPersonal(true);
            }}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            {isEditingPersonal ? <Save className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
            <span>{isEditingPersonal ? (language === 'ar' ? 'حفظ التعديلات' : 'Enregistrer') : (language === 'ar' ? 'تعديل' : 'Modifier')}</span>
          </button>
        </div>

        {isEditingPersonal ? (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {language === 'ar' ? 'الاسم الكامل:' : 'Nom complet :'}
              </label>
              <input
                type="text"
                value={fullNameInput}
                onChange={(e) => setFullNameInput(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {language === 'ar' ? 'رقم الهاتف:' : 'Téléphone :'}
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {language === 'ar' ? 'البريد الإلكتروني:' : 'Email :'}
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الاسم:' : 'Nom :'}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{user.fullName}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الهاتف:' : 'Téléphone :'}</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{user.phone}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'البريد الإلكتروني:' : 'Email :'}</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 truncate block">{user.email}</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Saved Locations (Home, Campus, Work) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              {language === 'ar' ? 'الأماكن والمواقع المحفوظة' : 'Adresses enregistrées'}
            </h3>
          </div>
          <button
            onClick={() => setIsAddingLocation(!isAddingLocation)}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إضافة مكان' : 'Ajouter'}</span>
          </button>
        </div>

        {isAddingLocation && (
          <form onSubmit={handleAddLocation} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 mb-2">
            <input
              type="text"
              value={newLocTitle}
              onChange={(e) => setNewLocTitle(e.target.value)}
              placeholder={language === 'ar' ? 'عنوان المكان (مثال: بيت العائلة)' : 'Nom du lieu...'}
              className="w-full py-1.5 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={newLocAddress}
              onChange={(e) => setNewLocAddress(e.target.value)}
              placeholder={language === 'ar' ? 'العنوان التفصيلي أو الحي' : 'Adresse complète...'}
              className="w-full py-1.5 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingLocation(false)}
                className="text-xs text-slate-500"
              >
                {language === 'ar' ? 'إلغاء' : 'Annuler'}
              </button>
              <button
                type="submit"
                className="py-1 px-3 bg-teal-600 text-white rounded-lg text-xs font-bold"
              >
                {language === 'ar' ? 'حفظ' : 'Ajouter'}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {savedLocs.map((loc) => (
            <div
              key={loc.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">
                    {language === 'ar' ? loc.titleAr : loc.titleFr}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {loc.addressAr}
                  </p>
                </div>
              </div>

              {loc.type === 'custom' && (
                <button
                  onClick={() => handleDeleteLocation(loc.id)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. System Preferences (Language & Theme) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Settings className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>{language === 'ar' ? 'إعدادات التطبيق والمظهر' : 'Préférences & Affichage'}</span>
        </h3>

        <div className="space-y-2.5 text-xs">
          {/* Language Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'ar' ? 'لغة التطبيق' : 'Langue'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2 py-1 rounded text-xs font-bold ${
                  language === 'ar' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded text-xs font-bold ${
                  language === 'fr' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Français
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-bold ${
                  language === 'en' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2">
              {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-teal-400" />}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'ar' ? 'الوضع المظلم (Dark Mode)' : 'Mode sombre'}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              className="py-1 px-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
            >
              {theme === 'light' ? (language === 'ar' ? 'تفعيل الداكن' : 'Activer') : (language === 'ar' ? 'تفعيل الفاتح' : 'Désactiver')}
            </button>
          </div>
        </div>
      </div>

      {/* 6. Security, Privacy & Logout */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>{language === 'ar' ? 'الأمان والخصوصية' : 'Sécurité & Données'}</span>
        </h3>

        <div className="space-y-2 text-xs">
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between text-right hover:border-teal-500 transition-colors"
          >
            <span>{language === 'ar' ? 'تغيير كلمة المرور' : 'Modifier le mot de passe'}</span>
            <Lock className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-between text-right hover:border-teal-500 transition-colors"
          >
            <span>{language === 'ar' ? 'أذونات الموقع الجغرافي والبيانات الطلابية' : 'Permissions de localisation'}</span>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => openAuthModal('login')}
            className="w-full p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center gap-2 transition-colors mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>{language === 'ar' ? 'تسجيل الخروج من الحساب' : 'Déconnexion'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
