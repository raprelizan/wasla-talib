import React, { useState } from 'react';
import {
  Gift,
  GraduationCap,
  Search,
  Bookmark,
  BookmarkCheck,
  Tag,
  Calendar,
  MapPin,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BenefitCategory, OpportunityCategory, BenefitOffer, Opportunity } from '../../types';

export const BenefitsScreen: React.FC = () => {
  const {
    benefits,
    toggleSaveBenefit,
    setSelectedBenefitForDetails,
    opportunities,
    toggleSaveOpportunity,
    setSelectedOpportunityForDetails,
    language,
    user,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'discounts' | 'opportunities'>('discounts');
  const [selectedCategory, setSelectedCategory] = useState<BenefitCategory>('all');
  const [selectedOppCategory, setSelectedOppCategory] = useState<OpportunityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Filter benefits
  const filteredBenefits = benefits.filter((b) => {
    if (showSavedOnly && !b.isSaved) return false;
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.titleAr.toLowerCase().includes(q) ||
        b.businessNameAr.toLowerCase().includes(q) ||
        b.locationAr.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    if (showSavedOnly && !opp.isSaved) return false;
    if (selectedOppCategory !== 'all' && opp.category !== selectedOppCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        opp.titleAr.toLowerCase().includes(q) ||
        opp.organizationAr.toLowerCase().includes(q) ||
        opp.locationAr.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories: { id: BenefitCategory; labelAr: string; labelFr: string }[] = [
    { id: 'all', labelAr: 'الكل', labelFr: 'Tous' },
    { id: 'food', labelAr: 'مطاعم وكافيهات', labelFr: 'Restaurants' },
    { id: 'stationery', labelAr: 'مكتبات وطباعة', labelFr: 'Librairies' },
    { id: 'tech', labelAr: 'إلكترونيات', labelFr: 'Tech' },
    { id: 'telecom', labelAr: 'إنترنت واتصالات', labelFr: 'Télécom' },
    { id: 'education', labelAr: 'دورات ولغات', labelFr: 'Formations' },
  ];

  const oppCategories: { id: OpportunityCategory; labelAr: string; labelFr: string }[] = [
    { id: 'all', labelAr: 'الكل', labelFr: 'Tous' },
    { id: 'internship', labelAr: 'تربصات PFE', labelFr: 'Stages' },
    { id: 'scholarship', labelAr: 'منح دراسية', labelFr: 'Bourses' },
    { id: 'job', labelAr: 'وظائف طلابية', labelFr: 'Jobs' },
    { id: 'competition', labelAr: 'مسابقات وهاكاثون', labelFr: 'Concours' },
  ];

  return (
    <div className="space-y-5 pb-24 md:pb-12 animate-in fade-in duration-200">
      {/* Top Banner & Section Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>{language === 'ar' ? 'مزايا وفرص الطالب الجامعي' : 'Avantages & Opportunités Étudiantes'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'تخفيضات تجارية حصرية، باقات إنترنت، وفرص تربص ومنح دراسية بالجزائر'
              : 'Réductions partenaires, offres télécom et stages PFE'}
          </p>
        </div>

        {/* Section Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-center">
          <button
            onClick={() => {
              setActiveSection('discounts');
              setShowSavedOnly(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'discounts'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {language === 'ar' ? 'العروض والتخفيضات' : 'Réductions'}
          </button>
          <button
            onClick={() => {
              setActiveSection('opportunities');
              setShowSavedOnly(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'opportunities'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {language === 'ar' ? 'وصلة المستقبل (المنح والتربصات)' : 'Stages & Bourses'}
          </button>
        </div>
      </div>

      {/* Search & Saved Toggle Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 right-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeSection === 'discounts'
                ? language === 'ar' ? 'ابحث عن مطعم، مكتبة، أو متجر...' : 'Rechercher une enseigne...'
                : language === 'ar' ? 'ابحث عن تربص، شركة، أو منحة...' : 'Rechercher un stage...'
            }
            className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          onClick={() => setShowSavedOnly(!showSavedOnly)}
          className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            showSavedOnly
              ? 'border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {language === 'ar' ? 'المفضلة' : 'Favoris'}
          </span>
        </button>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {activeSection === 'discounts'
          ? categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-teal-600 text-white font-bold'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {language === 'ar' ? cat.labelAr : cat.labelFr}
              </button>
            ))
          : oppCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedOppCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 font-medium ${
                  selectedOppCategory === cat.id
                    ? 'bg-teal-600 text-white font-bold'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {language === 'ar' ? cat.labelAr : cat.labelFr}
              </button>
            ))}
      </div>

      {/* SECTION 1: DISCOUNTS & BENEFITS GRID */}
      {activeSection === 'discounts' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredBenefits.map((offer) => (
            <div
              key={offer.id}
              onClick={() => setSelectedBenefitForDetails(offer)}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:border-teal-500 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src={offer.image}
                  alt={offer.titleAr}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute top-2.5 right-2.5 bg-teal-500 text-slate-950 font-extrabold text-xs px-2 py-0.5 rounded shadow">
                  -{offer.discountPercent}%
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveBenefit(offer.id);
                  }}
                  className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
                >
                  {offer.isSaved ? (
                    <BookmarkCheck className="w-3.5 h-3.5 text-teal-400" />
                  ) : (
                    <Bookmark className="w-3.5 h-3.5" />
                  )}
                </button>
                <div className="absolute bottom-2.5 right-3 left-3">
                  <span className="text-[10px] font-bold text-teal-300 uppercase">
                    {offer.businessNameAr}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 leading-tight">
                    {offer.titleAr}
                  </h3>
                </div>
              </div>

              <div className="p-3.5 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate text-[11px]">{offer.locationAr}</span>
                </div>
                <span className="text-teal-600 dark:text-teal-400 font-bold text-[11px] whitespace-nowrap mr-2">
                  {language === 'ar' ? 'عرض الكوبون ←' : 'Voir le code'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: OPPORTUNITIES & STAGES GRID */}
      {activeSection === 'opportunities' && (
        <div className="space-y-3.5">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => setSelectedOpportunityForDetails(opp)}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 cursor-pointer transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                      {opp.organizationAr}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      آخر أجل: {opp.deadline}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {opp.titleAr}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {opp.descriptionAr}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveOpportunity(opp.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
                >
                  {opp.isSaved ? (
                    <BookmarkCheck className="w-4 h-4 text-teal-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.locationAr}</span>
                  </span>
                  {opp.stipendAr && (
                    <span className="hidden sm:inline text-teal-600 dark:text-teal-400 font-medium">
                      {opp.stipendAr}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold text-xs">
                  <span>{opp.hasApplied ? (language === 'ar' ? 'تم التقديم' : 'Déjà postulé') : (language === 'ar' ? 'تفاصيل الأهلية والتقديم ←' : 'Postuler')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
