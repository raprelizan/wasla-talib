import React, { useState, useMemo } from 'react';
import {
  X,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  GraduationCap,
  Building2,
  MapPin,
  FileText,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ALGERIA_WILAYAS, ALGERIA_MUNICIPALITIES, ALGERIA_UNIVERSITIES } from '../../data/algeriaGeo';

export const StudentVerificationModal: React.FC = () => {
  const {
    isVerificationModalOpen,
    setIsVerificationModalOpen,
    user,
    submitVerification,
    resetVerificationStatus,
    language,
    showToast,
  } = useApp();

  // Form states
  const [selectedWilaya, setSelectedWilaya] = useState(user.wilayaId || '16');
  const [selectedMunicipality, setSelectedMunicipality] = useState(user.municipalityId || '1602');
  const [selectedUniversity, setSelectedUniversity] = useState(user.universityId || 'univ-usthb');
  const [faculty, setFaculty] = useState(user.facultyAr || 'كلية الإعلام الآلي والرياضيات');
  const [department, setDepartment] = useState(user.departmentAr || 'قسم الذكاء الاصطناعي وهندسة البرمجيات');
  const [studyLevel, setStudyLevel] = useState(user.studyLevelAr || 'ماستر 1 (M1)');
  const [studentCardId, setStudentCardId] = useState(user.studentCardId || '2023/16/094821');

  // Card photo upload simulation
  const [cardFrontPreview, setCardFrontPreview] = useState<string | null>(
    user.cardFrontUrl || '/src/assets/images/wasla_hero_students_1793923860308.jpg'
  );
  const [cardBackPreview, setCardBackPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isVerificationModalOpen) return null;

  // Filter municipalities by selected wilaya
  const filteredMunicipalities = ALGERIA_MUNICIPALITIES.filter(
    (m) => m.wilayaCode === selectedWilaya
  );

  // Filter universities by selected wilaya
  const filteredUniversities = ALGERIA_UNIVERSITIES.filter(
    (u) => u.wilayaCode === selectedWilaya
  );

  const handleSimulateUpload = (type: 'front' | 'back') => {
    // In demo environment, set a high-resolution preview asset
    if (type === 'front') {
      setCardFrontPreview('/src/assets/images/wasla_hero_students_1793923860308.jpg');
      showToast(language === 'ar' ? 'تم تحميل واجهة بطاقة الطالب' : 'Recto de la carte chargé');
    } else {
      setCardBackPreview('/src/assets/images/wasla_student_cafe_1793923860782.jpg');
      showToast(language === 'ar' ? 'تم تحميل ظهر بطاقة الطالب' : 'Verso de la carte chargé');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentCardId.trim()) {
      showToast(language === 'ar' ? 'يرجى إدخال رقم التسجيل الجامعي (Matricule)' : 'Veuillez saisir votre matricule');
      return;
    }

    const wilayaObj = ALGERIA_WILAYAS.find((w) => w.code === selectedWilaya);
    const munObj = ALGERIA_MUNICIPALITIES.find((m) => m.id === selectedMunicipality);
    const univObj = ALGERIA_UNIVERSITIES.find((u) => u.id === selectedUniversity);

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      submitVerification({
        wilayaId: selectedWilaya,
        wilayaNameAr: wilayaObj ? wilayaObj.nameAr : 'الجزائر',
        municipalityId: selectedMunicipality,
        municipalityNameAr: munObj ? munObj.nameAr : 'الجزائر الوسطى',
        universityId: selectedUniversity,
        universityNameAr: univObj ? univObj.nameAr : 'جامعة الجزائر',
        facultyAr: faculty,
        departmentAr: department,
        studyLevelAr: studyLevel,
        studentCardId: studentCardId,
        cardFrontUrl: cardFrontPreview || undefined,
        cardBackUrl: cardBackPreview || undefined,
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {language === 'ar' ? 'توثيق الهوية والصفة الطلابية' : 'Vérification du statut étudiant'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {language === 'ar'
                  ? 'التحقق الأكاديمي الرسمي للاستفادة من أسعار النقل المدعومة والمزايا'
                  : 'Validation officielle pour bénéficier des tarifs préférentiels'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVerificationModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Status Banner */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {language === 'ar' ? 'الحالة الحالية:' : 'Statut actuel :'}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${
                user.verificationStatus === 'verified'
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200'
                  : user.verificationStatus === 'pending'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                  : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
              }`}
            >
              {user.verificationStatus === 'verified' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {user.verificationStatus === 'pending' && <Clock className="w-3.5 h-3.5" />}
              {user.verificationStatus === 'unverified' && <AlertTriangle className="w-3.5 h-3.5" />}
              <span>
                {user.verificationStatus === 'verified' && (language === 'ar' ? 'طالب موثق ومعتمد 🎓' : 'Étudiant certifié')}
                {user.verificationStatus === 'pending' && (language === 'ar' ? 'قيد المراجعة الأكاديمية' : 'En cours de validation')}
                {user.verificationStatus === 'unverified' && (language === 'ar' ? 'غير موثق (مطلوب التقديم)' : 'Non vérifié')}
                {user.verificationStatus === 'rejected' && (language === 'ar' ? 'مرفوض - أعد رفع البطاقة' : 'Refusé')}
              </span>
            </span>
          </div>

          {user.verificationStatus !== 'unverified' && (
            <button
              onClick={resetVerificationStatus}
              className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === 'ar' ? 'إعادة تعيين الحالة' : 'Réinitialiser'}</span>
            </button>
          )}
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          {/* Geographical cascading selection: Wilaya & Municipality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'الولاية (69 ولاية جزائرية)' : 'Wilaya'}
              </label>
              <div className="relative">
                <select
                  value={selectedWilaya}
                  onChange={(e) => {
                    setSelectedWilaya(e.target.value);
                    const firstMun = ALGERIA_MUNICIPALITIES.find((m) => m.wilayaCode === e.target.value);
                    if (firstMun) setSelectedMunicipality(firstMun.id);
                  }}
                  className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {ALGERIA_WILAYAS.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.code} - {w.nameAr} ({w.nameFr})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'البلدية التابعة للولاية' : 'Commune'}
              </label>
              <select
                value={selectedMunicipality}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {filteredMunicipalities.length > 0 ? (
                  filteredMunicipalities.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nameAr} ({m.nameFr})
                    </option>
                  ))
                ) : (
                  <option value="">
                    {language === 'ar' ? 'البلدية المركزية' : 'Commune centrale'}
                  </option>
                )}
              </select>
            </div>
          </div>

          {/* Educational Institution Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'ar' ? 'المؤسسة الجامعية أو المعهد العالي' : 'Établissement Universitaire'}
            </label>
            <div className="relative">
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {ALGERIA_UNIVERSITIES.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nameAr} — ({u.campusNameAr})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Faculty & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'الكلية' : 'Faculté'}
              </label>
              <input
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="مثال: كلية الإعلام الآلي والرياضيات"
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'القسم / التخصص' : 'Département'}
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="مثال: هندسة البرمجيات"
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Level & Matricule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'المستوى الدراسي' : 'Niveau d\'études'}
              </label>
              <select
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="ليسانس 1 (L1)">ليسانس 1 (L1)</option>
                <option value="ليسانس 2 (L2)">ليسانس 2 (L2)</option>
                <option value="ليسانس 3 (L3)">ليسانس 3 (L3)</option>
                <option value="ماستر 1 (M1)">ماستر 1 (M1)</option>
                <option value="ماستر 2 (M2)">ماستر 2 (M2)</option>
                <option value="دكتوراه">دكتوراه (Doctorat)</option>
                <option value="سنة تحضيرية / مهندس">سنة تحضيرية / مهندس دولة</option>
                <option value="علوم طبية">علوم طبية (Médecine / Pharmacie)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'رقم التسجيل الجامعي (Matricule)' : 'Numéro d\'immatriculation'}
              </label>
              <input
                type="text"
                value={studentCardId}
                onChange={(e) => setStudentCardId(e.target.value)}
                placeholder="2023/16/094821"
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
              />
            </div>
          </div>

          {/* Student Card Photos Upload (Front & Back) */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'ar'
                ? 'صورة بطاقة الطالب الجامعية الرسمية (الوجه الأمامي والخلفي)'
                : 'Photo de la carte d\'étudiant (Recto / Verso)'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Card Front */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-800/40 relative group">
                {cardFrontPreview ? (
                  <div className="w-full">
                    <img
                      src={cardFrontPreview}
                      alt="واجهة بطاقة الطالب"
                      referrerPolicy="no-referrer"
                      className="w-full h-24 object-cover rounded-lg mb-2 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">
                        {language === 'ar' ? 'الوجه الأمامي جاهز' : 'Recto chargé'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSimulateUpload('front')}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
                      >
                        {language === 'ar' ? 'استبدال' : 'Remplacer'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {language === 'ar' ? 'رفع الوجه الأمامي' : 'Téléverser le Recto'}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload('front')}
                      className="mt-2 text-[11px] px-2.5 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-teal-600 hover:text-white rounded transition-colors"
                    >
                      {language === 'ar' ? 'اختيار صورة' : 'Choisir'}
                    </button>
                  </div>
                )}
              </div>

              {/* Card Back */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-800/40 relative group">
                {cardBackPreview ? (
                  <div className="w-full">
                    <img
                      src={cardBackPreview}
                      alt="ظهر بطاقة الطالب"
                      referrerPolicy="no-referrer"
                      className="w-full h-24 object-cover rounded-lg mb-2 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">
                        {language === 'ar' ? 'الظهر جاهز' : 'Verso chargé'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSimulateUpload('back')}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
                      >
                        {language === 'ar' ? 'استبدال' : 'Remplacer'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {language === 'ar' ? 'رفع ظهر البطاقة (اختياري)' : 'Verso (optionnel)'}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSimulateUpload('back')}
                      className="mt-2 text-[11px] px-2.5 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-teal-600 hover:text-white rounded transition-colors"
                    >
                      {language === 'ar' ? 'اختيار صورة' : 'Choisir'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsVerificationModalOpen(false)}
              className="py-2.5 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              {language === 'ar' ? 'إلغاء' : 'Annuler'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {language === 'ar' ? 'إرسال طلب التوثيق الأكاديمي' : 'Soumettre pour vérification'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
