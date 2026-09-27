/**
 * Standalone script: replaces whatever is currently in the Programs
 * collection with the four official IGCSE Program Pathways, without
 * touching Users, FAQs, or any other collection.
 *
 * Run from the backend/ folder:
 *   node reseedPrograms.js
 */
require('dotenv').config();
const connectDB = require('./config/db');
const Program = require('./models/Program');

const programs = [
  {
    title: 'IGCSE Express Path',
    slug: 'igcse-express-path',
    tagline: 'Intensive Track',
    overview:
      'An intensive, high-pace track for strong or older students who can manage a heavier subject load per term. All core and science subjects are completed within a single academic year, across two exam sittings.',
    subjectsCovered: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    duration: '1 Year',
    numberOfTerms: '2 Terms',
    numberOfSubjects: '5 Subjects',
    quickFacts: [
      { label: 'Duration', value: '1 Academic Year' },
      { label: 'Exam Sessions', value: '2 Sessions' },
      { label: 'Study Pace', value: 'Intensive' },
      { label: 'Ideal For', value: 'Strong / Older Students' },
    ],
    startInfo: 'Starts Dec 2026',
    photo: '/images/programs/igcse-express-path.jpg',
    entryRequirements: 'Best suited to strong, self-motivated students aged 15+',
    feeReference: 'Contact Admissions for fees',
    ctaLabel: 'Enroll Now',
    isLaunchingSoon: false,
    order: 1,
    terms: [
      { termLabel: 'Term 1', dateRange: 'Dec 2026 – May 2027', subjects: 'English, Mathematics, Biology, Chemistry, Physics' },
      { termLabel: 'Term 2', dateRange: 'June 2027 – Nov 2027', subjects: 'Mathematics (continued), Physics (Advanced), Chemistry (Advanced)' },
    ],
    examSchedule: [
      { session: 'May / June 2027', subjects: 'English, Biology' },
      { session: 'Oct / Nov 2027', subjects: 'Mathematics, Physics, Chemistry' },
    ],
    atAGlance: { pace: 'Fastest', examSittings: '2', weeklyLoad: 'Heavy', bestFor: 'Ages 15+' },
    whoItSuits:
      'Strong, self-motivated students — or older joiners — who want full IGCSE certification completed in a single academic year.',
  },
  {
    title: 'IGCSE Global Path',
    slug: 'igcse-global-path',
    tagline: 'International / Gulf',
    overview:
      'A balanced-pace track designed for international and Gulf-based students, covering the core subject set required for global university eligibility — without country-specific subjects.',
    subjectsCovered: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'ICT'],
    duration: '1.5 Years',
    numberOfTerms: '3 Terms',
    numberOfSubjects: '6 Subjects',
    quickFacts: [
      { label: 'Study Pace', value: 'Balanced' },
      { label: 'Students', value: 'International / Gulf' },
      { label: 'Focus', value: 'Core Subjects' },
      { label: 'Goal', value: 'Global University Eligibility' },
    ],
    startInfo: 'International / Gulf Students',
    entryRequirements: 'Open to international and Gulf-based students',
    feeReference: 'Contact Admissions for fees',
    ctaLabel: 'Enroll Now',
    isLaunchingSoon: false,
    order: 2,
    terms: [
      { termLabel: 'Term 1', dateRange: 'Dec 2026 – May 2027', subjects: 'English, Mathematics (Part 1), Biology' },
      { termLabel: 'Term 2', dateRange: 'June 2027 – Nov 2027', subjects: 'Mathematics (Part 2), Chemistry, Physics' },
      { termLabel: 'Term 3', dateRange: 'Dec 2027 – May 2028', subjects: 'ICT, Mathematics (Advanced / Final Revision)' },
    ],
    examSchedule: [
      { session: 'May / June 2027', subjects: 'English, Biology' },
      { session: 'Oct / Nov 2027', subjects: 'Chemistry, Physics' },
      { session: 'May / June 2028', subjects: 'Mathematics, ICT' },
    ],
    atAGlance: { pace: 'Balanced', examSittings: '3', weeklyLoad: 'Moderate', bestFor: 'Gulf / International' },
    whoItSuits:
      'Families abroad and specifically Gulf students who need globally recognized university-entry subjects, delivered at a comfortable, evenly-spread pace.',
  },
  {
    title: 'IGCSE National Path',
    slug: 'igcse-national-path',
    tagline: 'Pakistani Students',
    overview:
      'The complete subject bouquet for students requiring Pakistani-university-recognized equivalence, including Urdu, Pakistan Studies, and Islamic Studies alongside the core academic subjects.',
    subjectsCovered: ['English', 'Mathematics', 'Urdu', 'Chemistry', 'Physics', 'Pakistan Studies', 'Islamic Studies', 'ICT', 'Biology'],
    duration: '2 Years',
    numberOfTerms: '4 Terms',
    numberOfSubjects: '8 Subjects',
    quickFacts: [
      { label: 'Students', value: 'Pakistani Students' },
      { label: 'Subjects', value: 'Complete Subject Set' },
      { label: 'Includes', value: 'Urdu & Pakistan Studies' },
      { label: 'Focus', value: 'Local Equivalence' },
    ],
    startInfo: 'Pakistani Students',
    entryRequirements: 'Open to students seeking Pakistani-university-recognized equivalence',
    feeReference: 'Contact Admissions for fees',
    ctaLabel: 'Enroll Now',
    isLaunchingSoon: false,
    order: 3,
    terms: [
      { termLabel: 'Term 1', dateRange: 'Dec 2026 – May 2027', subjects: 'English, Mathematics (Part 1), Urdu' },
      { termLabel: 'Term 2', dateRange: 'June 2027 – Nov 2027', subjects: 'Mathematics (Part 2), Chemistry, Physics' },
      { termLabel: 'Term 3', dateRange: 'Dec 2027 – May 2028', subjects: 'Pakistan Studies, Mathematics (Final), Islamic Studies' },
      { termLabel: 'Term 4', dateRange: 'June 2028 – Nov 2028', subjects: 'ICT, Biology' },
    ],
    examSchedule: [
      { session: 'May / June 2027', subjects: 'English, Urdu' },
      { session: 'Oct / Nov 2027', subjects: 'Physics, Chemistry' },
      { session: 'May / June 2028', subjects: 'Mathematics, Pakistan Studies, Islamic Studies' },
      { session: 'Oct / Nov 2028', subjects: 'ICT, Biology' },
    ],
    atAGlance: { pace: 'Standard', examSittings: '4', weeklyLoad: 'Moderate', bestFor: 'Pakistani Students' },
    whoItSuits:
      'Students requiring Pakistani-university-recognized equivalence, who need Urdu, Pakistan Studies, and Islamic Studies alongside the core academic subjects.',
  },
  {
    title: 'IGCSE Foundation Rise',
    slug: 'igcse-foundation-rise',
    tagline: 'Ages 10–12',
    overview:
      'A mastery-paced early-start track for younger students. One subject is introduced at a time, beginning with Physics, with new subjects layered in gradually as students build confidence and readiness.',
    subjectsCovered: ['Physics', 'Islamic Studies', 'Mathematics', 'English', 'Pakistan Studies', 'Chemistry', 'Biology', 'Urdu'],
    duration: '3 Years',
    numberOfTerms: '6 Terms',
    numberOfSubjects: '5/8 Subjects',
    quickFacts: [
      { label: 'Age Group', value: '10–12 Years' },
      { label: 'Study Pace', value: 'Mastery-Paced' },
      { label: 'Approach', value: 'One Subject at a Time' },
      { label: 'Focus', value: 'Confidence Building' },
    ],
    startInfo: 'Ages 10–12',
    entryRequirements: 'Open to younger students aged 10–12',
    feeReference: 'Contact Admissions for fees',
    ctaLabel: 'Enroll Now',
    isLaunchingSoon: false,
    order: 4,
    terms: [
      { termLabel: 'Term 1', dateRange: 'Dec 2026 – June 2027', subjects: 'Physics (only), Islamic Studies (Pakistani students)' },
      { termLabel: 'Term 2', dateRange: 'June 2027 – Nov 2027', subjects: 'Physics (Advanced), Mathematics (Part 1)' },
      { termLabel: 'Term 3', dateRange: 'Dec 2027 – June 2028', subjects: 'Mathematics (Part 2), English, Pakistan Studies (Pakistani students)' },
      { termLabel: 'Term 4', dateRange: 'June 2028 – Nov 2028', subjects: 'English (Advanced), Mathematics (Advanced)' },
      { termLabel: 'Term 5', dateRange: 'Dec 2028 – June 2029', subjects: 'Chemistry, Biology, Urdu (Pakistani students)' },
      { termLabel: 'Term 6', dateRange: 'June 2029 – Nov 2029', subjects: 'Chemistry (Advanced), Biology (Advanced)' },
    ],
    examSchedule: [
      { session: 'May / June 2027', subjects: 'Islamic Studies' },
      { session: 'Oct / Nov 2027', subjects: 'Physics' },
      { session: 'May / June 2028', subjects: 'Pakistan Studies' },
      { session: 'Oct / Nov 2028', subjects: 'English, Mathematics' },
      { session: 'May / June 2029', subjects: 'Urdu' },
      { session: 'Oct / Nov 2029', subjects: 'Chemistry, Biology' },
    ],
    atAGlance: { pace: 'Mastery-Paced', examSittings: '6', weeklyLoad: 'Light', bestFor: 'Ages 10–12' },
    whoItSuits:
      'Younger students who benefit from being introduced to one subject at a time, building confidence and readiness gradually — 5 to 8 subjects total over 3 years depending on track.',
  },
];

const run = async () => {
  await connectDB();

  const deleted = await Program.deleteMany({});
  console.log(`Removed ${deleted.deletedCount} existing program(s).`);

  const inserted = await Program.insertMany(programs);
  console.log(`Inserted ${inserted.length} IGCSE Program Pathway(s):`);
  inserted.forEach((p) => console.log(`  - ${p.title} (/programs/${p.slug})`));

  console.log('Done.');
  process.exit(0);
};

run().catch((err) => {
  console.error('reseedPrograms failed:', err);
  process.exit(1);
});