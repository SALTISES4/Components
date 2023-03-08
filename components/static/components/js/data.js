import { faker } from "@faker-js/faker";

import CategoryIcon from "@mui/icons-material/Category";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import PeopleIcon from "@mui/icons-material/People";
import ScienceIcon from "@mui/icons-material/Science";
import {
  DistributionState,
  PeerImpactLabels,
  PeerImpactLevels,
  QuestionDifficultyLabels,
  QuestionDifficultyLevels,
} from "./_localComponents/enum";

import { ExerciceLabels } from "./_search/enum";

export const assignments = [
  {
    active: true,
    author: faker.name.fullName(),
    creationDate: faker.date.recent(),
    difficulty: faker.helpers.arrayElement([
      QuestionDifficultyLabels.easy,
      QuestionDifficultyLabels.moderate,
      QuestionDifficultyLabels.difficult,
    ]),
    distributionState: faker.helpers.arrayElement([
      DistributionState.draft,
      DistributionState.distributed,
    ]),
    dueDate: faker.date.soon(),
    group: {},
    questionCount: parseInt(faker.random.numeric(1)),
    title: faker.lorem.sentence(),
    issueCount: parseInt(faker.random.numeric(1)),
    progress: parseInt(faker.random.numeric(1)),
    answerCount: parseInt(faker.random.numeric(1)),
  },
  {
    active: true,
    author: faker.name.fullName(),
    creationDate: faker.date.recent(),
    difficulty: faker.helpers.arrayElement([
      QuestionDifficultyLabels.easy,
      QuestionDifficultyLabels.moderate,
      QuestionDifficultyLabels.difficult,
    ]),
    distributionState: faker.helpers.arrayElement([
      DistributionState.draft,
      DistributionState.distributed,
    ]),
    dueDate: faker.date.soon(),
    group: {
      title: faker.lorem.sentence(),
      author: faker.name.fullName(),
      session: faker.helpers.arrayElement(["Summer 2022", "Winter 2023"]),
      studentCount: parseInt(faker.random.numeric(1)),
      assignmentCount: parseInt(faker.random.numeric(1)),
      active: faker.datatype.boolean(),
      subject: faker.helpers.arrayElement([
        ["Biology"],
        ["Biology", "Cohesion"],
        ["Mechanic", "Programming", "Thermodynamic"],
      ]),
      dueDate: faker.date.soon(),
      progress: parseInt(faker.random.numeric(2)),
    },
    questionCount: parseInt(faker.random.numeric(1)),
    title: faker.lorem.sentence(),
    issueCount: parseInt(faker.random.numeric(1)),
    progress: parseInt(faker.random.numeric(1)),
    answerCount: parseInt(faker.random.numeric(1)),
  },
];
export const collections = [
  {
    title: faker.lorem.sentence(),
    author: faker.name.fullName(),
    description: faker.lorem.sentence(),
    answerCount: parseInt(faker.random.numeric(1)),
    tags: faker.helpers.arrayElement([
      ["Biology"],
      ["Biology", "Cohesion"],
      ["Mechanic", "Programming", "Thermodynamic"],
    ]),
    url: "/",
  },
  {
    title: faker.lorem.sentence(),
    author: faker.name.fullName(),
    description: faker.lorem.sentence(),
    answerCount: parseInt(faker.random.numeric(1)),
    tags: faker.helpers.arrayElement([
      ["Biology"],
      ["Biology", "Cohesion"],
      ["Mechanic", "Programming", "Thermodynamic"],
    ]),
    url: "/",
  },
];
export const questions = [
  {
    answer_count: parseInt(faker.random.numeric(1)),
    title: faker.lorem.sentence(),
    user: { username: faker.name.fullName() },
    text: faker.lorem.sentence(),
    discipline: { pk: 1, title: "Physics" },
    category: faker.helpers.arrayElement([
      [{ title: "Biology" }],
      [{ title: "Biology" }, { title: "Cohesion" }],
      [
        { title: "Mechanic" },
        { title: "Programming" },
        { title: "Thermodynamic" },
      ],
    ]),
    difficulty: {
      score: 0.4,
      value: QuestionDifficultyLabels.moderate,
      label: QuestionDifficultyLevels.deux,
    },
    peer_impact: {
      value: PeerImpactLabels.med,
      label: PeerImpactLevels.deux,
    },
  },
  {
    answer_count: parseInt(faker.random.numeric(2)),
    title: faker.lorem.sentence(),
    user: { username: faker.name.fullName() },
    text: faker.lorem.sentence(),
    discipline: { pk: 1, title: "Physics" },
    category: faker.helpers.arrayElement([
      [{ title: "Biology" }],
      [{ title: "Biology" }, { title: "Cohesion" }],
      [
        { title: "Mechanic" },
        { title: "Programming" },
        { title: "Thermodynamic" },
      ],
    ]),
    peer_impact: {
      value: PeerImpactLabels.high,
      label: PeerImpactLevels.trois,
    },
    difficulty: {
      score: 0.7,
      value: QuestionDifficultyLabels.difficult,
      label: QuestionDifficultyLevels.trois,
    },
  },
  {
    answer_count: parseInt(faker.random.numeric(1)),
    title: faker.lorem.sentence(),
    user: { username: faker.name.fullName() },
    text: faker.lorem.sentence(),
    discipline: { pk: 1, title: "Physics" },
    category: faker.helpers.arrayElement([
      [{ title: "Biology" }],
      [{ title: "Biology" }, { title: "Cohesion" }],
      [
        { title: "Mechanic" },
        { title: "Programming" },
        { title: "Thermodynamic" },
      ],
    ]),
    peer_impact: {
      value: PeerImpactLabels.low,
      label: PeerImpactLevels.un,
    },
    difficulty: {
      score: 0.1,
      value: QuestionDifficultyLabels.easy,
      label: QuestionDifficultyLevels.un,
    },
  },
];
export const teacher = {
  activeAssignmentCount: 4,
  activeGroupCount: 3,
  createdQuestionCount: 12,
};

export const typeFilters = {
  title: "Type",
  subtitle: "types",
  icon: CategoryIcon,
  notification: parseInt(faker.random.numeric(1)),
  choices: [
    ExerciceLabels.assignment,
    ExerciceLabels.collection,
    ExerciceLabels.group,
    ExerciceLabels.question,
  ],
};
export const disciplineFilters = {
  title: "Discipline",
  subtitle: "disciplines",
  icon: ScienceIcon,
  notification: parseInt(faker.random.numeric(1)),
  choices: ["Disc 1", "Disc 2", "Disc 3", "Disc 4", "Disc 5", "Disc 6"],
};
export const categoryFilters = {
  title: "Category",
  subtitle: "categories",
  icon: FilterAltIcon,
  notification: parseInt(faker.random.numeric(2)),
  choices: ["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5", "Cat 6"],
};
export const difficultyFilters = {
  title: "Difficulty",
  subtitle: "difficulties",
  icon: NetworkCheckIcon,
  notification: parseInt(faker.random.numeric(1)),
  choices: [
    QuestionDifficultyLabels.easy,
    QuestionDifficultyLabels.moderate,
    QuestionDifficultyLabels.difficult,
    QuestionDifficultyLabels.unknown,
  ],
};
export const peerImpactFilters = {
  title: "Peer Impact",
  subtitle: "peer impacts",
  icon: PeopleIcon,
  notification: parseInt(faker.random.numeric(2)),
  choices: [
    PeerImpactLabels.zero,
    PeerImpactLabels.un,
    PeerImpactLabels.deux,
    PeerImpactLabels.trois,
  ],
};
