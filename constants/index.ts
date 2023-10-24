export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const topQuestions: TopQuestions[] = [
  {
    _id: 1,
    question: "How can I handle exceptions in JavaScript?",
  },
  {
    _id: 2,
    question: "What's the best way to optimize database queries in Node.js?",
  },
  {
    _id: 3,
    question: "How do I implement authentication in a React app with JWT?",
  },
  {
    _id: 4,
    question: "What are the key differences between REST and GraphQL APIs?",
  },
];

export const popularTags = [
  { _id: 1, name: "Typescript", totalQuestions: 12 },
  { _id: 2, name: "React", totalQuestions: 16 },
  { _id: 3, name: "PHP", totalQuestions: 3 },
  { _id: 4, name: "JAVA", totalQuestions: 17 },
];
