
import React from 'react';
import { Protocol, AlignmentQuestion, Manna, MannaSlot, Herb, HerbCategory, CalendarDay, MoonPhase, Tribe, TimelineEvent } from './types';

export const LORDS_PRAYER = {
  title: "The Lord's Prayer",
  scripture: "Matthew 6:9-13",
  text: `Our Father which art in heaven, Hallowed be thy name.
Thy kingdom come. Thy will be done in earth, as it is in heaven.
Give us this day our daily bread.
And forgive us our debts, as we forgive our debtors.
And lead us not into temptation, but deliver us from evil: 
For thine is the kingdom, and the power, and the glory, for ever. Amen.`
};

export const TIMELINE_DATA: TimelineEvent[] = [
  { era: "Creation", year: "Day 1-7", event: "Genesis 1-2", significance: "Foundation of Covenant", user_note: "Basis for all sacred law and physical obedience." },
  { era: "Patriarchs", year: "2000-1700 BCE", event: "Abrahamic Covenant", significance: "Lineage Promised", user_note: "Your tribal identity begins in the blood of the fathers." },
  { era: "Exodus", year: "1446 BCE", event: "Sinai Revelation", significance: "Torah Given", user_note: "Core of the Codex remedies and the Law of Cleanliness." },
  { era: "Kingdom", year: "1010 BCE", event: "Davidic Throne", significance: "Prophetic Kingship", user_note: "The Standard of the Royal Priesthood established." },
  { era: "Exile", year: "586 BCE", event: "Babylonian Dispersion", significance: "Spiritual Purification", user_note: "Ancestral memory began to fade; restoration process starts here." },
  { era: "The Hinge", year: "BC / AD", event: "Messiah's Witness", significance: "The Way Re-opened", user_note: "Total obedience demonstrated; Feasts observed perfectly." },
  { era: "Dispersion", year: "70 AD - 1900s", event: "Global Scattering", significance: "Lost Identity", user_note: "The tribes scattered to the four corners as prophesied." },
  { era: "Awakening", year: "2020 - 2025", event: "The Remembrance", significance: "Remnant Arising", user_note: "The spirit moves to restore the Law in the hearts of the elect." },
  { era: "Tipping Point", year: "2026", event: "Final Alignment", significance: "Prophetic Climax", user_note: "The 144,000 elect are sealed through total covenantal health." }
];

export interface VocabCard {
  word: string;
  original: string;
  transliteration: string;
  language: 'Hebrew' | 'Greek';
  meaning: string;
  depth: string;
  scripture: string;
}

export const VOCAB_CARDS: VocabCard[] = [
  { word: 'Shalom', original: 'שָׁלוֹם', transliteration: 'Sha-lom', language: 'Hebrew', meaning: 'Peace, completeness, welfare, health.', depth: 'Beyond absence of conflict, Shalom implies a state of being whole and in total alignment with the Creator’s order.', scripture: 'Numbers 6:26' },
  { word: 'Logos', original: 'λόγος', transliteration: 'Lo-gos', language: 'Greek', meaning: 'The Word, reason, plan, or divine utterance.', depth: 'The pre-existent blueprint of creation. The logic of the Law made manifest.', scripture: 'John 1:1' },
  { word: 'Kadosh', original: 'קָדוֹשׁ', transliteration: 'Ka-dosh', language: 'Hebrew', meaning: 'Holy, set apart, sacred.', depth: 'To be Kadosh is to be functionally distinct. De-secularization of the body.', scripture: 'Leviticus 19:2' },
  { word: 'Ruach', original: 'רוּחַ', transliteration: 'Ru-akh', language: 'Hebrew', meaning: 'Spirit, wind, breath.', depth: 'The animating force of the Most High. Without Ruach, the clay is merely earth.', scripture: 'Genesis 1:2' },
  { word: 'Agape', original: 'ἀγάπη', transliteration: 'A-ga-pe', language: 'Greek', meaning: 'Sacrificial love.', depth: 'The highest form of love, a volitional act of the will for the well-being of the covenant.', scripture: '1 Corinthians 13:1' }
];

export const ALIGNMENT_QUESTIONS: AlignmentQuestion[] = [
  { id: 'q1', text: 'Do you separate your diet according to the Levitical law?', category: 'diet' },
  { id: 'q2', text: 'Are you familiar with the rhythms of a consecrated fast?', category: 'fasting' },
  { id: 'q3', text: 'Do you maintain purification of the temple (body) daily?', category: 'cleanliness' },
  { id: 'q4', text: 'Is the Sabbath observed as a day of total rest?', category: 'rest' },
  { id: 'q5', text: 'Do you consume foods born of Babylonian oppression?', category: 'diet' }
];

export const DAILY_MANNA: Manna[] = [
  { slot: MannaSlot.MORNING, scripture: 'Psalm 5:3', prayer: 'My voice shalt thou hear in the morning, O LORD...' },
  { slot: MannaSlot.AFTERNOON, scripture: 'Psalm 55:17', prayer: 'Evening, and morning, and at noon, will I pray...' },
  { slot: MannaSlot.NIGHT, scripture: 'Psalm 4:8', prayer: 'I will both lay me down in peace, and sleep...' }
];

export const PROTOCOLS: Protocol[] = [
  { id: 'p1', title: 'Edenic Diet Purification', scripture: 'Leviticus 11:1-47', description: 'Abstain from all unclean beasts.', category: 'Diet', points: 15 },
  { id: 'p2', title: 'Sabbath Sanctification', scripture: 'Exodus 20:8-11', description: 'Cease from all labor and digital defilement.', category: 'Rest', points: 25 }
];

const TRIBES_SEQUENCE = [
  Tribe.REUBEN, Tribe.SIMEON, Tribe.LEVI, Tribe.JUDAH, 
  Tribe.DAN, Tribe.NAPHTALI, Tribe.GAD, Tribe.ASHER, 
  Tribe.ISSACHAR, Tribe.ZEBULUN, Tribe.EPHRAIM, Tribe.MANASSEH, Tribe.BENJAMIN
];

const TRIBAL_LORE: Record<string, string> = {
  [Tribe.JUDAH]: "Judah led the tribes in deliverance; his lineage forms the throne of the Messiah.",
  [Tribe.LEVI]: "Levi received the Torah, setting the example of obedience and priestly service.",
  [Tribe.BENJAMIN]: "Benjamin’s vigilance preserved the remnant; swift action is required in times of trial.",
  [Tribe.EPHRAIM]: "Ephraim's strength pushes the tribes toward the inheritance of the land.",
  'All Tribes': "The whole house of Israel stands as one before the Law."
};

const TRIBAL_REMEDIES: Record<string, string> = {
  [Tribe.REUBEN]: 'Honey + Mustard',
  [Tribe.SIMEON]: 'Mint + Salt',
  [Tribe.LEVI]: 'Hyssop + Olive',
  [Tribe.JUDAH]: 'Olive + Frankincense',
  [Tribe.DAN]: 'Rue + Mustard',
  [Tribe.NAPHTALI]: 'Mustard + Flax',
  [Tribe.GAD]: 'Olive + Cinnamon',
  [Tribe.ASHER]: 'Olive + Pomegranate',
  [Tribe.ISSACHAR]: 'Clay + Water',
  [Tribe.ZEBULUN]: 'Vinegar + Honey',
  [Tribe.EPHRAIM]: 'Bull + Olive',
  [Tribe.MANASSEH]: 'Fig + Olive',
  [Tribe.BENJAMIN]: 'Honey + Frankincense',
  'All Tribes': 'Olive Oil tonic'
};

const TRIBAL_AURAS: Record<string, string> = {
  [Tribe.JUDAH]: 'aura-lion',
  [Tribe.LEVI]: 'aura-spiritual',
  [Tribe.BENJAMIN]: 'aura-wolf',
  [Tribe.EPHRAIM]: 'aura-ox',
  'All Tribes': 'aura-pulse'
};

const generateMonth = (monthName: string, overrides: Record<number, Partial<CalendarDay>> = {}): CalendarDay[] => {
  return Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let tribe: Tribe | 'All Tribes' = 'All Tribes';
    if (day >= 2 && day <= 28) {
      tribe = TRIBES_SEQUENCE[(day - 2) % TRIBES_SEQUENCE.length];
    }
    const base: CalendarDay = {
      day, month: monthName, moon: MoonPhase.NEW, tribe,
      remedyName: TRIBAL_REMEDIES[tribe as string] || 'Olive Oil tonic',
      aura: TRIBAL_AURAS[tribe as string] || 'aura-pulse',
      notes: tribe === 'All Tribes' ? 'Begin with reflection' : 'Maintain tribal discipline',
      lore: TRIBAL_LORE[tribe as string] || "A pillar of the Remnant Protocol.",
      codex_remedy: "Consume the herbal tonic and observe the Morning Watch."
    };
    if (overrides[day]) return { ...base, ...overrides[day] };
    return base;
  });
};

export const ANCESTRAL_CALENDAR: Record<string, CalendarDay[]> = {
  'Nissan': generateMonth('Nissan', {
    14: { feast: 'Passover', tribe: Tribe.JUDAH, lore: TRIBAL_LORE[Tribe.JUDAH], codex_remedy: "Unleavened bread diet, symbolic cleansing rituals" },
    15: { feast: 'Unleavened Bread', tribe: Tribe.ASHER }
  }),
  'Iyar': generateMonth('Iyar'),
  'Sivan': generateMonth('Sivan', {
    14: { feast: 'Shavuot', tribe: Tribe.LEVI, lore: TRIBAL_LORE[Tribe.LEVI], codex_remedy: "Torah reading & spiritual purification" }
  })
};

export const TRIBE_COLORS: Record<string, string> = {
  [Tribe.JUDAH]: '#d4af37', [Tribe.REUBEN]: '#ef4444', [Tribe.SIMEON]: '#22c55e', 
  [Tribe.LEVI]: '#3b82f6', [Tribe.DAN]: '#14b8a6', [Tribe.NAPHTALI]: '#0ea5e9', 
  [Tribe.GAD]: '#4d7c0f', [Tribe.ASHER]: '#10b981', [Tribe.ISSACHAR]: '#ffffff', 
  [Tribe.ZEBULUN]: '#4f46e5', [Tribe.EPHRAIM]: '#a855f7', [Tribe.MANASSEH]: '#3b82f6',
  [Tribe.BENJAMIN]: '#1c1917', 'All Tribes': '#d4af37'
};

export const HERBS: Herb[] = [
  // OILS
  { name: 'Olive Oil', category: HerbCategory.OILS, scriptures: ['Exodus 30:23'], spiritualFunction: 'Anointing for protection.', physicalApplication: 'Moisturizes skin.', curseBroken: 'Restores the light of the eyes.', preparation: 'First press.', notes: 'Base for formulas' },
  { name: 'Myrrh Oil', category: HerbCategory.OILS, scriptures: ['Esther 2:12'], spiritualFunction: 'Sanctification of the bloodline.', physicalApplication: 'Tissue repair.', curseBroken: 'Purges ancestral sorrow.', preparation: 'Distilled resin.' },
  
  // WATER
  { name: 'Spring Water', category: HerbCategory.WATER, scriptures: ['John 4:14'], spiritualFunction: 'The Water of Life; renewal.', physicalApplication: 'Hydration foundation.', curseBroken: 'Ends spiritual drought.', preparation: 'Raw from source.' },
  
  // HERBS
  { name: 'Hyssop', category: HerbCategory.HERBS, scriptures: ['Psalm 51:7'], spiritualFunction: 'Primary bloodline cleanser.', physicalApplication: 'Antimicrobial.', curseBroken: 'Purges spiritual leprosy.', preparation: 'Brew as tea.' },
  { name: 'Rue', category: HerbCategory.HERBS, scriptures: ['Luke 11:42'], spiritualFunction: 'Ward against low frequencies.', physicalApplication: 'Digestive aid.', curseBroken: 'Breaks parasitic drains.', preparation: 'Oil infusion.' },
  
  // SEEDS
  { name: 'Mustard Seed', category: HerbCategory.SEEDS, scriptures: ['Matthew 17:20'], spiritualFunction: 'Explosive potential of faith.', physicalApplication: 'Metabolic fire.', curseBroken: 'Reverses pining away.', preparation: 'Ground into tonic.' },
  { name: 'Flax Seed', category: HerbCategory.SEEDS, scriptures: ['Isaiah 28:25'], spiritualFunction: 'Internal flow and endurance.', physicalApplication: 'Heart health.', curseBroken: 'Smooths internal trauma.', preparation: 'Soaked mucilage.' },
  
  // FRUITS
  { name: 'Pomegranate', category: HerbCategory.FRUITS, scriptures: ['Exodus 28:33'], spiritualFunction: 'Abundance and the Law.', physicalApplication: 'Immune powerhouse.', curseBroken: 'Restores fruit of the body.', preparation: 'Eat raw seeds.' },
  { name: 'Figs', category: HerbCategory.FRUITS, scriptures: ['Isaiah 38:21'], spiritualFunction: 'Prosperity and safety.', physicalApplication: 'Enzyme source.', curseBroken: 'Heals the botch of Egypt.', preparation: 'Apply as poultice.' },
  
  // MINERALS
  { name: 'Dead Sea Salt', category: HerbCategory.MINERALS, scriptures: ['Leviticus 2:13'], spiritualFunction: 'Covenant preservation.', physicalApplication: 'Mineral balancing.', curseBroken: 'Halts spirit of corruption.', preparation: 'Dissolve in water.' },
  { name: 'Sacred Clay', category: HerbCategory.MINERALS, scriptures: ['Jeremiah 18:6'], spiritualFunction: 'Restoration of form.', physicalApplication: 'Deep detoxification.', curseBroken: 'Reverses confusion of face.', preparation: 'Mix with water.' },
  
  // FERMENTS
  { name: 'Raw Honey', category: HerbCategory.FERMENTS, scriptures: ['Proverbs 24:13'], spiritualFunction: 'Sweetness of the Word.', physicalApplication: 'Antimicrobial energy.', curseBroken: 'Enlightens failing eyes.', preparation: 'Raw and unfiltered.' }
];

export const Icons = {
  Menorah: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 3v18M12 7c-2.5 0-4.5 2-4.5 4.5V21M12 11c-4.5 0-7.5 3-7.5 7.5V21M12 7c2.5 0 4.5 2 4.5 4.5V21M12 11c4.5 0 7.5 3 7.5 7.5V21" strokeLinecap="round" />
    </svg>
  ),
  Lion: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity=".2"/>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z" />
    </svg>
  )
};
