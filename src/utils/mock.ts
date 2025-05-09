import images from './images';

const general = [
  {
    id: 1,
    title: 'Profile',
    link: '/profile',
  },
  {
    id: 2,
    title: 'Language',
    link: '/language',
  },

  {
    id: 3,
    title: 'Contact Us',
    link: '/contactus',
  },
];

const security = [
  {
    id: 1,
    title: 'Privacy Policy',
    link: '',
  },
];

const languages = [
  {
    id: 1,
    title: 'English',
  },
  {
    id: 2,
    title: 'Spanish',
  },
  {
    id: 3,
    title: 'French',
  },
  {
    id: 4,
    title: 'German',
  },
  {
    id: 5,
    title: 'Italian',
  },
  {
    id: 6,
    title: 'Japanese',
  },
  {
    id: 7,
    title: 'Korean',
  },
  {
    id: 8,
    title: 'Portuguese',
  },
  {
    id: 9,
    title: 'Russian',
  },
];

const profileItems = [
  {
    id: 1,
    icon: 'profile',
    title: 'My account',
    link: 'MyAccount',
  },
  {
    id: 1,
    icon: 'bell',
    title: 'Help center',
    link: 'Faq',
  },
  {
    id: 1,
    icon: 'shield',
    title: 'Privacy & Security',
    link: 'PrivacyAndSecurity',
  },
];

const categories = [
  {
    id: 1,
    name: 'Housing',
    icon: 'home',
  },
  {
    id: 2,
    name: 'Communication',
    icon: 'home',
  },
  {
    id: 3,
    name: 'Insurance',
    icon: 'home',
  },
  {
    id: 4,
    name: 'Transportation',
    icon: 'home',
  },
  {
    id: 5,
    name: 'Food and Dining',
    icon: 'home',
  },
  {
    id: 6,
    name: 'Entertainment',
    icon: 'home',
  },
  {
    id: 7,
    name: 'Health and Fitness',
    icon: 'home',
  },
];

const priorityQuestions = [
  {
    id: 1,
    icon: 'settings',
    title: 'How to set up an account?',
    color: '#EEF2FF',
    shade: '#818CF8',
    backgroundColor: '#6366F1',
  },
  {
    id: 2,
    icon: 'shield',
    title: 'Is my financial data safe?',
    color: '#F0F9FF',
    shade: '#38BDF8',
    backgroundColor: '#0EA5E9',
  },
  {
    id: 3,
    icon: 'budgets',
    title: 'Can I set budgets and goals?',
    color: '#F5F3FF',
    shade: '#A78BFA',
    backgroundColor: '#8B5CF6',
  },
];

const faqs = [
  {
    id: 1,
    title: 'Is my financial data safe?',
    answer:
      'Yes, we use the latest security technology to protect your financial data.',
  },
  {
    id: 2,
    title: 'Can I set budgets and goals?',
    answer:
      'Yes, you can set budgets and goals to help you manage your finances.',
  },
  {
    id: 3,
    title: 'How does expense tracking work?',
    answer: 'You can track your expenses by category, date, and amount.',
  },
  {
    id: 4,
    title: 'What reports can I generate',
    answer: 'You can generate reports on your income, expenses, and net worth.',
  },
];

const onboarding = [
  {
    // image: require('../assets/illustrations/Net Worth.png'),
    title: 'Get Started',
    text: 'Start your financial journey with us.',
  },
  {
    // image: require('../assets/illustrations/Graph.png'),
    title: 'Plan Your Budget',
    text: 'Take control of your spending.',
  },
  {
    // image: require('../assets/illustrations/Making money.png'),
    title: 'Boost Your Savings',
    text: 'Achieve your financial goals faster.',
  },
  {
    // image: require('../assets/illustrations/Bankcruptcy.png'),
    title: 'Invest Wisely',
    text: 'Grow your wealth.',
  },
];

export default {
  general,
  security,
  languages,
  profileItems,
  priorityQuestions,
  faqs,
  onboarding,
  categories,
};
