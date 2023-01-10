import { faker } from "@faker-js/faker";

export const assignments = [
  {
    author: faker.name.fullName(),
    creationDate: faker.date.recent(),
    difficulty: faker.helpers.arrayElement(["Easy", "Difficult"]),
    distributionState: faker.helpers.arrayElement([
      "Distributed",
      "Not distributed",
    ]),
    dueDate: faker.date.soon(),
    groups: [],
    questionCount: parseInt(faker.random.numeric(1)),
    title: faker.lorem.sentence(),
  },
  {
    title: "Assignment 2",
    author: faker.name.fullName(),
    creationDate: "12 Nov",
    difficulty: "Difficult",
    distributionState: "Distributed",
    dueDate: "30 Nov",
    groups: [
      {
        title: "Group Bio 1",
        session: "Summer 2022",
        subject: "Biology",
        numberStudent: 30,
        difficulty: "Easy",
        statut: "Active",
        dueDate: "2022-11-11",
        progress: 53,
      },
      {
        title: "Group Bio 2",
        session: "Summer 2022",
        subject: "Biology",
        numberStudent: 30,
        difficulty: "Easy",
        statut: "Active",
        dueDate: "2022-12-30",
        progress: 4,
      },
    ],
    questionCount: 15,
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
export const questions = [
  {
    answerCount: 40,
    title: "Lorem ipsum dolor sit amet",
    author: "John Peterson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    tags: ["Biology", "Cohesion"],
    difficulty: { score: 0.4, value: 2, label: "Avg" },
    peerImpact: 1,
  },
  {
    answerCount: 44,
    title: "Lorem ipsum dolor sit amet",
    author: "John Peterson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    tags: ["Biology", "Cohesion"],
    difficulty: { score: 0.7, value: 3, label: "Hard" },
    peerImpact: 2,
  },
  {
    answerCount: 10,
    title: "Lorem ipsum dolor sit amet",
    author: "John Peterson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    tags: ["Biology", "Cohesion", "tag3"],
    difficulty: { score: 0.1, value: 1, label: "Easy" },
    peerImpact: 3,
  },
];
export const teacher = {
  activeAssignmentCount: 4,
  activeGroupCount: 3,
  createdQuestionCount: 12,
};
