import GuidePageContent from './GuidePageContent';

export const metadata = {
  title: 'Renovation Guide | Renovation Bridge',
  description: 'Your complete guide to home renovation with Renovation Bridge.',
}

const guideTopics = [
  {
    id: 'getting-started',
    title: 'Getting Started with Your Renovation',
    description: 'Everything you need to know before starting your home renovation project.',
    icon: '/images/icons/compass.svg',
  },
  {
    id: 'budgeting',
    title: 'Budgeting for Success',
    description: 'How to create and stick to a renovation budget that works for your situation.',
    icon: '/images/icons/calculator.svg',
  },
  {
    id: 'contractor-selection',
    title: 'Selecting the Right Contractor',
    description: 'Tips and strategies for finding and vetting the perfect contractor for your project.',
    icon: '/images/icons/handshake.svg',
  },
  {
    id: 'timeline-planning',
    title: 'Planning Your Timeline',
    description: 'Realistic timelines for different types of renovation projects and how to manage delays.',
    icon: '/images/icons/calendar.svg',
  },
  {
    id: 'design-choices',
    title: 'Making Design Choices',
    description: 'Guidelines for selecting materials, colors, and finishes that will stand the test of time.',
    icon: '/images/icons/palette.svg',
  },
  {
    id: 'living-through-renovation',
    title: 'Living Through a Renovation',
    description: 'Practical advice for maintaining your sanity when living in a construction zone.',
    icon: '/images/icons/home.svg',
  }
];

export default function GuidePage() {
  return <GuidePageContent guideTopics={guideTopics} />;
} 