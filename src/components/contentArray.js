const contentArray = [
  {
    urlStub: '/reports',
    pageHeading: 'Reports',
    pageBlurb: 'something',
    buttonText: 'Start now',
    buttonLink: 'somewhere.html',
    reportType: 'tabs',
  },
  {
    urlStub: '/vessels',
    pageHeading: 'Vessels',
    pageBlurb: 'You can view, edit or delete vessels that you regularly add to Advanced Voyage Reports.',
    formIntroHeading: 'Save a new vessel',
    formIntroBlurb: 'Save the details of vessels that you regularly submit Advanced Voyage Reports for.',
    buttonText: 'Save a vessel',
    buttonLink: 'vessels/save-vessel',
    reportType: 'tables',
    reportTitles: ['Vessel name', 'Vessel type', 'Usual moorings'],
  },
  {
    urlStub: '/people',
    pageHeading: 'People',
    pageBlurb: 'You can view, edit or delete people that you regularly sail with so that you can easily add them to Advanced Voyage Reports.',
    formIntroHeading: 'Save a new person',
    formIntroBlurb: 'Save the details of people that you regularly sail with.',
    buttonText: 'Save a person',
    buttonLink: 'somewhere.html',
    reportType: 'tables',
    reportTitles: ['Surname', 'Given name', 'Type'],
  },
  {
    urlStub: '/account',
    pageHeading: 'Account',
    pageBlurb: 'something',
    buttonText: 'Start now',
    buttonLink: 'somewhere.html',
    reportType: 'none',
  },
];

export default contentArray;
