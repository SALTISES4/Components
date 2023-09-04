declare function gettext(a: string): string;

export enum AllowedEmbedHosts {
  GEOGEBRA = "www.geogebra.org",
  PHET = "phet.colorado.edu",
  YOUTUBE1 = "www.youtube.com",
  YOUTUBE2 = "www.youtube-nocookie.com",
  YOUTUBE3 = "youtube.com",
  YOUTUBE4 = "youtu.be",
  VIMEO = "player.vimeo.com",
}
export enum AnswerStyles {
  Alphabetic = 0,
  Numeric = 1,
}

export enum DistributionState {
  draft = "Draft",
  distributed = "Distributed",
}

export enum PeerImpactLabels {
  low = "Low",
  med = "Med",
  high = "High",
  unknown = "Not enough data",
}

export enum PeerImpactLevels {
  un = 1,
  deux = 2,
  trois = 3,
  quatre = 4,
}

export enum QuestionDifficultyLabels {
  easy = "Easy",
  moderate = "Avg",
  difficult = "Hard",
  unknown = "Not enough data",
}

export enum QuestionDifficultyLevels {
  un = 1,
  deux = 2,
  trois = 3,
  quatre = 4,
}

export enum QuestionTypes {
  PI = "PI",
  RO = "RO",
}

export enum QuestionImageTypes {
  PNG = "png",
  GIF = "gif",
  JPG = "jpg",
  JPEG = "jpeg",
}

export const RationaleSelectionAlgorithms = {
  // Object as opposed to enum to support translations
  simple: gettext("Simple random rationale selection"),
  prefer_expert_and_highly_voted: gettext(
    "Prefer expert and highly voted rationales",
  ),
};
