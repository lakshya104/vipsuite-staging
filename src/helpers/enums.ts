/* eslint-disable no-unused-vars */
export enum UserRole {
  Vip = 'vip',
  Agent = 'agent',
  Brand = 'brand',
}

export enum ProfileStatus {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected',
}

export enum DefaultImageFallback {
  PersonPlaceholder = '/img/personPlaceholder.png',
  Placeholder = '/img/placeholder.png',
  LandscapePlaceholder = '/img/landscape-placeholder.webp',
}

export enum CookieName {
  ProfileId = 'profileId',
  SkipProfile = 'skip',
  ProfileCompleted = 'profileCompleted',
  IsAgent = 'isAgent',
}

export enum QuestionType {
  Text = 'text',
  TextArea = 'textarea',
  CheckBoxes = 'checkboxes',
  Dropdown = 'dropdown',
  Radio = 'radio',
  Date = 'date',
  DateTime = 'datetime',
  Time = 'time',
  FileUpload = 'file_upload',
}

export enum PostType {
  Opportunity = 'opportunity',
  Event = 'event',
}
