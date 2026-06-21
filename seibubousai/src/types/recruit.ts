export type RecruitPosition = "inspection" | "construction";

export interface Recruit {
  id: string;
  position: RecruitPosition;
  positionLabel: string;
  employmentType: string;
  salary: string;
  location: string;
  workContent: string;
  requirements: string;
  welcome: string;
}
