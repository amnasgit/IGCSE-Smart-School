const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: String, trim: true }, // e.g. "International / Gulf"
    overview: { type: String, required: true },
    subjectsCovered: [{ type: String }],
    duration: { type: String }, // e.g. "1.5 Years"
    numberOfTerms: { type: String }, // e.g. "3 Terms" — shown as a badge on the detail page
    numberOfSubjects: { type: String }, // e.g. "6 Subjects" — shown as a badge on the detail page
    quickFacts: [
      {
        label: { type: String, trim: true },
        value: { type: String, trim: true },
      },
    ],
    startInfo: { type: String }, // e.g. "Starts Dec 2026" or "Pakistani Students" — 4th badge
    photo: { type: String }, // path/URL to a student photo shown on this program's detail page
    entryRequirements: { type: String },
    feeReference: { type: String, default: 'Contact Admissions for fees' },
    ctaLabel: { type: String, enum: ['Enroll Now', 'Register Interest'], default: 'Enroll Now' },
    isLaunchingSoon: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },

    // Rich pathway detail content (term-by-term structure, exam sessions, etc.)
    terms: [
      {
        termLabel: { type: String }, // "Term 1"
        dateRange: { type: String }, // "Dec 2026 – May 2027"
        subjects: { type: String }, // "English, Mathematics, Biology, Chemistry, Physics"
      },
    ],
    examSchedule: [
      {
        session: { type: String }, // "May / June 2027"
        subjects: { type: String }, // "English, Biology"
      },
    ],
    atAGlance: {
      pace: { type: String }, // "Fastest" / "Balanced" / "Standard" / "Mastery-Paced"
      examSittings: { type: String }, // "2"
      weeklyLoad: { type: String }, // "Heavy" / "Moderate" / "Light"
      bestFor: { type: String }, // "Ages 15+"
    },
    whoItSuits: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Program', programSchema);