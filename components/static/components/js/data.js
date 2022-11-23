export const assigments = [
  {
    title: "Assigment 1",
    autor: "MySelf",
    creationDate: "12 Nov",
    dueDate: "30 Nov",
    DistributionState: "Distributed",
    questions: [
      {
        title: "Question 1",
        autor: "autor 1",
        level: "easy",
        description: "Description 1",
      },
      {
        title: "Question 2",
        autor: "autor 2",
        level: "easy",
        description: "Description 2",
      },
      {
        title: "Question 3",
        autor: "autor 3",
        level: "easy",
        description: "Description 3",
      },
    ],
  },
  {
    title: "Assigment 1",
    autor: "MySelf",
    creationDate: "12 Nov",
    dueDate: "30 Nov",
    DistributionState: "Distributed",
    questions: [
      {
        title: "Question 1",
        autor: "autor 1",
        level: "easy",
        description: "Description 1",
      },
      {
        title: "Question 2",
        autor: "autor 2",
        level: "easy",
        description: "Description 2",
      },
      {
        title: "Question 3",
        autor: "autor 3",
        level: "easy",
        description: "Description 3",
      },
    ],
  },
];

export const collections = [
  {
    title: "A collection title",
    autor: "Saltise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    tags: ["Biology"],
  },
  {
    title: "A collection title",
    autor: "Saltise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    tags: ["Biology"],
  },
];

export const groups = [
  {
    title: "Group Bio 1",
    session: "Summer 2022",
    subject: "Biology",
    numberStudent: "30",
    difficulty: "Easy",
    statut: "Active",
  },
  {
    title: "Group Bio 2",
    session: "Summer 2022",
    subject: "Biology",
    numberStudent: "30",
    difficulty: "Easy",
    statut: "Active",
  },
];

export const navbar = {
  logo: "../static/components/img/logo.png",
  groups: [
    [
      { title: "Search", icon: "search", url: "/" },
      { title: "Dashboard", icon: "dashboard", url: "/" },
    ],
    [
      { title: "Questions", icon: "forum", url: "/" },
      { title: "Assignments", icon: "assignment", url: "/" },
      { title: "Collections", icon: "collections_bookmark", url: "/" },
    ],
    [
      { title: "Student Activity", icon: "notifications", url: "/" },
      { title: "Group 1", icon: "groups", url: "/" },
      { title: "Group 2", icon: "groups", url: "/" },
      { title: "Group 3", icon: "groups", url: "/" },
      { title: "Manage groups", icon: "settings", url: "/" },
    ],
    [{ title: "CourseFlow", icon: "account_tree", url: "/" }],
  ],
  nonce: "{{ request.csp_nonce }}",
};

export const questions = [
  {
    title: "Principles of inheritance",
    autor: "John Peterson",
    description: "",
    tags: ["Biology", "Cohesion"],
    difficulty: "Easy",
    peerImpact: 1,
  },
  {
    title: "Principles of inheritance",
    autor: "John Peterson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    tags: ["Biology", "Cohesion"],
    difficulty: "Medium",
    peerImpact: 2,
  },
];

export const user = {
  username: "jsumner",
  name: "John",
  avatar: "../static/components/img/avatar.jpg",
};
