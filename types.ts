
export enum Tribe {
  REUBEN = 'Reuben',
  SIMEON = 'Simeon',
  LEVI = 'Levi',
  JUDAH = 'Judah',
  DAN = 'Dan',
  NAPHTALI = 'Naphtali',
  GAD = 'Gad',
  ASHER = 'Asher',
  ISSACHAR = 'Issachar',
  ZEBULUN = 'Zebulun',
  JOSEPH = 'Joseph',
  EPHRAIM = 'Ephraim',
  MANASSEH = 'Manasseh',
  BENJAMIN = 'Benjamin',
  UNKNOWN = 'Still Seeking / In Exile'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum LifeStage {
  CHILD = 'Child',
  YOUTH = 'Youth',
  ADULT = 'Adult',
  ELDER = 'Elder'
}

export enum ScoreTier {
  DIM = 'Dim (Exile Fog)',
  KINDLED = 'Kindled (Awakening)',
  BURNING = 'Burning (Remnant)',
  SEALED = 'Sealed (Royal Priesthood)',
  ETERNAL = 'Eternal (Seal Watch)'
}

export enum HerbCategory {
  OILS = 'Sacred Oils',
  SEEDS = 'Ancient Seeds',
  HERBS = 'Temple Herbs',
  FRUITS = 'Edenic Fruits',
  MINERALS = 'Earth Minerals',
  FERMENTS = 'Ritual Ferments',
  WATER = 'Living Waters'
}

export interface UserContext {
  tribe: Tribe;
  gender: Gender;
  lifeStage: LifeStage;
  score: number;
}

export interface Testimony {
  id: string;
  tribe: Tribe;
  gender: Gender;
  text: string;
  timestamp: number;
  type: 'Obedience' | 'Correction' | 'Restoration';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum MoonPhase {
  NEW = '🌑',
  WAXING_CRESCENT = '🌒',
  FIRST_QUARTER = '🌓',
  FULL = '🌕',
  LAST_QUARTER = '🌗',
  WANING_CRESCENT = '🌘'
}

export interface CalendarDay {
  day: number;
  month: string;
  moon: MoonPhase;
  feast?: string;
  tribe: Tribe | 'All Tribes';
  remedyName: string;
  aura: string;
  notes: string;
  lore?: string;
  codex_remedy?: string;
}

export interface TimelineEvent {
  era: string;
  year: string;
  event: string;
  significance: string;
  user_note: string;
}

export interface AlignmentQuestion {
  id: string;
  text: string;
  category: 'diet' | 'fasting' | 'cleanliness' | 'rest';
}

export interface WitnessRecord {
  id: string;
  timestamp: number;
  shift: string;
  ease: string;
  note?: string;
  scriptureRef?: string;
}

export interface Protocol {
  id: string;
  title: string;
  scripture: string;
  description: string;
  category: 'Diet' | 'Hygiene' | 'Rest' | 'Purification';
  points: number;
}

export enum MannaSlot {
  MORNING = 'Morning Watch',
  AFTERNOON = 'Midday Duty',
  NIGHT = 'Evening Seal'
}

export interface Manna {
  slot: MannaSlot;
  scripture: string;
  prayer: string;
}

export enum ProtocolStatus {
  ROYAL_STANDARD_UPHELD = 'Royal Standard Upheld'
}

export interface Herb {
  name: string;
  category: HerbCategory;
  scriptures: string[];
  spiritualFunction: string;
  physicalApplication: string;
  curseBroken: string;
  preparation?: string;
  notes?: string;
}

export enum WitnessShift {
  DIET = 'Dietary Law',
  REST = 'Sabbath Watch',
  SPEECH = 'Pure Tongue',
  MIND = 'Temple Guard'
}

export enum WitnessEase {
  EFFORTLESS = 'Effortless Alignment',
  RESISTED = 'Resisted/Overcome',
  LABORED = 'Labored Obedience'
}

export enum ConsecrationType {
  RESET_3 = 'The 3-Day Reset',
  FOOD_7 = '7 Days of Edenic Purity',
  DISCIPLINE_14 = '14 Days of Royal Discipline'
}
