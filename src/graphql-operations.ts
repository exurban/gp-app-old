import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Image = {
  __typename?: "Image";
  id: Scalars["ID"];
  imageUrl: Scalars["String"];
  altText: Scalars["String"];
  fileType: Scalars["String"];
  fileExtension: Scalars["String"];
  size: Scalars["String"];
  width: Scalars["Int"];
  height: Scalars["Int"];
  photo?: Maybe<Photo>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Location = {
  __typename?: "Location";
  /** The ID of the location. It is unique, numeric and automatically-generated. */
  id: Scalars["ID"];
  /** The name of the Location. It is required and must be unique. */
  name: Scalars["String"];
  /** A tag for the Location. It is required and must be unique. */
  tag: Scalars["String"];
  /** Optional. A description of the location, used as a vignette at the top of the Location's photos page. */
  description?: Maybe<Scalars["String"]>;
  /** Optional. A map of the location used in conenction with the vignette at the top of the Location's photos page. */
  coverImage?: Maybe<Image>;
  /** Nullable. An array of photos taken at the Location. */
  photos?: Maybe<Array<Photo>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Collection = {
  __typename?: "Collection";
  id: Scalars["ID"];
  name: Scalars["String"];
  tag: Scalars["String"];
  description: Scalars["String"];
  coverImage?: Maybe<Image>;
  photosInCollection: Array<PhotoCollection>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type PhotoCollection = {
  __typename?: "PhotoCollection";
  collectionId: Collection;
  collection: Collection;
  photoId: Photo;
  photo: Photo;
};

export type Photographer = {
  __typename?: "Photographer";
  id: Scalars["ID"];
  /** The artist's full name */
  name: Scalars["String"];
  /** The artist's first name. */
  firstName: Scalars["String"];
  /** The artist's last name. */
  lastName: Scalars["String"];
  /** The artist's email address. */
  email: Scalars["String"];
  /** The Image for the artist's portrait. */
  coverImage?: Maybe<Image>;
  /** The artist's biography. */
  bio: Scalars["String"];
  /** Photos attributed to the artist. */
  photos: Array<Photo>;
  /** Date record was created. */
  createdAt: Scalars["DateTime"];
  /** Date record was most recently updated. */
  updatedAt: Scalars["DateTime"];
};

export type Subject = {
  __typename?: "Subject";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  /** Optional. An image of the subject used in connection with the vignette at the top of the Subject's photos page. */
  coverImage?: Maybe<Image>;
  photosOfSubject: Array<PhotoSubject>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type PhotoSubject = {
  __typename?: "PhotoSubject";
  subjectId: Subject;
  subject: Subject;
  photoId: Photo;
  photo: Photo;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"];
  /** The name of the tag. */
  name: Scalars["String"];
  /** Optional. A description of the tag used in connection with the vignette at the top of the Tag's photo page. */
  description?: Maybe<Scalars["String"]>;
  /** Optional. An image of the tag used in connection with the vignette at the top of the Tag's photos page. */
  coverImage?: Maybe<Image>;
  /** A connection through a join table to the photos tagged with the tag. */
  photosWithTag: Array<PhotoTag>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type PhotoTag = {
  __typename?: "PhotoTag";
  tagId: Tag;
  tag: Tag;
  photoId: Photo;
  photo: Photo;
};

export type UserShoppingBagItem = {
  __typename?: "UserShoppingBagItem";
  userId: User;
  user: User;
  photoId: Photo;
  photo: Photo;
};

export type Finish = {
  __typename?: "Finish";
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  photoUrl: Scalars["String"];
  /** finSku: Finish SKU. imgSku + finSku = ProductSku. */
  finSku?: Maybe<Scalars["String"]>;
  width: Scalars["Float"];
  height: Scalars["Float"];
  depth: Scalars["Float"];
  weight: Scalars["Float"];
  shippingWeight: Scalars["Float"];
  basePrice: Scalars["Float"];
  priceModifier: Scalars["Float"];
  photosWithFinish: Array<PhotoFinish>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  finishSku: Scalars["String"];
};

export type PhotoFinish = {
  __typename?: "PhotoFinish";
  finishId: Finish;
  finish: Finish;
  photoId: Photo;
  photo: Photo;
};

export type Photo = {
  __typename?: "Photo";
  id: Scalars["ID"];
  skuGenerator: Scalars["Int"];
  sku: Scalars["Int"];
  sortIndex: Scalars["Int"];
  title: Scalars["String"];
  description: Scalars["String"];
  isFeatured: Scalars["Boolean"];
  isLimitedEdition: Scalars["Boolean"];
  isDiscontinued: Scalars["Boolean"];
  rating: Scalars["Int"];
  basePrice?: Maybe<Scalars["Float"]>;
  priceModifier?: Maybe<Scalars["Float"]>;
  photographer?: Maybe<Photographer>;
  location?: Maybe<Location>;
  images?: Maybe<Array<Image>>;
  subjectsInPhoto?: Maybe<Array<PhotoSubject>>;
  tagsForPhoto?: Maybe<Array<PhotoTag>>;
  collectionsForPhoto?: Maybe<Array<PhotoCollection>>;
  finishesForPhoto?: Maybe<Array<PhotoFinish>>;
  favoritedByUsers?: Maybe<Array<UserFavorite>>;
  inShoppingBagsOfUsers?: Maybe<Array<UserShoppingBagItem>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UserFavorite = {
  __typename?: "UserFavorite";
  userId: User;
  user: User;
  photoId: Photo;
  photo: Photo;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  email_verified?: Maybe<Scalars["DateTime"]>;
  image?: Maybe<Scalars["String"]>;
  roles: Array<Scalars["String"]>;
  isSubscribed: Scalars["Boolean"];
  userFavorites: Array<UserFavorite>;
  userShoppingBagItems: Array<UserShoppingBagItem>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type GroupedPhotosAtLocationResponse = {
  __typename?: "GroupedPhotosAtLocationResponse";
  photos: Array<Photo>;
  locationInfo: Location;
};

export type PaginatedPhotosAtLocationResponse = {
  __typename?: "PaginatedPhotosAtLocationResponse";
  photos: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
  locationInfo: Location;
};

export type ItemCount = {
  __typename?: "ItemCount";
  name: Scalars["String"];
  count: Scalars["Int"];
};

export type GroupedPhotosByPhotographerResponse = {
  __typename?: "GroupedPhotosByPhotographerResponse";
  photos: Array<Photo>;
  photographerInfo: Photographer;
};

export type PaginatedPhotosByPhotographerResponse = {
  __typename?: "PaginatedPhotosByPhotographerResponse";
  photos: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
  photographerInfo: Photographer;
};

export type PaginatedPhotoResponse = {
  __typename?: "PaginatedPhotoResponse";
  photos: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
};

export type GroupedPhotosOfSubjectResponse = {
  __typename?: "GroupedPhotosOfSubjectResponse";
  photos: Array<Photo>;
  subjectInfo: Subject;
};

export type PaginatedPhotosOfSubjectResponse = {
  __typename?: "PaginatedPhotosOfSubjectResponse";
  photos: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
  subjectInfo: Subject;
};

export type SuccessMessageResponse = {
  __typename?: "SuccessMessageResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type GroupedPhotosWithTagResponse = {
  __typename?: "GroupedPhotosWithTagResponse";
  photos: Array<Photo>;
  tagInfo: Tag;
};

export type PaginatedPhotosWithTagResponse = {
  __typename?: "PaginatedPhotosWithTagResponse";
  photos: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
  tagInfo: Tag;
};

export type FavoritesResponse = {
  __typename?: "FavoritesResponse";
  photoList?: Maybe<Array<Photo>>;
};

export type AddPhotoToFavoritesResponse = {
  __typename?: "AddPhotoToFavoritesResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  addedPhoto?: Maybe<Photo>;
};

export type RemovePhotoFromFavoritesResponse = {
  __typename?: "RemovePhotoFromFavoritesResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  removedPhoto?: Maybe<Photo>;
};

export type ShoppingBagItemsResponse = {
  __typename?: "ShoppingBagItemsResponse";
  photoList?: Maybe<Array<Photo>>;
};

export type AddPhotoToShoppingBagResponse = {
  __typename?: "AddPhotoToShoppingBagResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  addedPhoto?: Maybe<Photo>;
};

export type RemovePhotoFromShoppingBagResponse = {
  __typename?: "RemovePhotoFromShoppingBagResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  removedPhoto?: Maybe<Photo>;
};

export type UserPreferencesResponse = {
  __typename?: "UserPreferencesResponse";
  favorites?: Maybe<Array<UserFavorite>>;
  shoppingBagItems?: Maybe<Array<UserShoppingBagItem>>;
};

export type CollectionInput = {
  name: Scalars["String"];
  tag: Scalars["String"];
  description: Scalars["String"];
};

export type CollectionUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  tag?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type FinishInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  photoUrl: Scalars["String"];
  finSku: Scalars["String"];
  width: Scalars["Float"];
  height: Scalars["Float"];
  depth: Scalars["Float"];
  weight: Scalars["Float"];
  shippingWeight: Scalars["Float"];
  basePrice: Scalars["Float"];
  priceModifier: Scalars["Float"];
};

export type FinishUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  photoUrl?: Maybe<Scalars["String"]>;
  finSku?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  depth?: Maybe<Scalars["Float"]>;
  weight?: Maybe<Scalars["Float"]>;
  shippingWeight?: Maybe<Scalars["Float"]>;
  basePrice?: Maybe<Scalars["Float"]>;
  priceModifier?: Maybe<Scalars["Float"]>;
};

export type ImageInput = {
  imageUrl: Scalars["String"];
  altText: Scalars["String"];
  fileType: Scalars["String"];
  fileExtension: Scalars["String"];
  size: Scalars["String"];
  width: Scalars["Int"];
  height: Scalars["Int"];
  photoId?: Maybe<Scalars["Float"]>;
};

export type ImageUpdateInput = {
  imageUrl?: Maybe<Scalars["String"]>;
  altText?: Maybe<Scalars["String"]>;
  fileType?: Maybe<Scalars["String"]>;
  fileExtension?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  photoId?: Maybe<Scalars["Float"]>;
};

/** Inputs to create a new Location entity. */
export type LocationInput = {
  /** Name of the location. */
  name: Scalars["String"];
  /** Tag used to ID the location in Photo Info links. */
  tag: Scalars["String"];
  /** Vignette describing the location. */
  description?: Maybe<Scalars["String"]>;
  /** Map of the location. Used at the top of the Location's Photo Gallery. Used to look up the Map and add it to the One-to-One relationship. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

/** Optional inputs to be used to update the Location Info. */
export type LocationUpdateInput = {
  /** Optional. Name of the Location. */
  name?: Maybe<Scalars["String"]>;
  /** Optional. Tag used to identify the Location. */
  tag?: Maybe<Scalars["String"]>;
  /** Vignette describing the location. */
  description?: Maybe<Scalars["String"]>;
  /** Map of the location. Used at the top of the Location's Photo Gallery. Used to look up the Map and add it to the One-to-One relationship. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type GroupedPhotosAtLocationInput = {
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Float"]>;
};

export type PaginatedPhotosAtLocationInput = {
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Float"]>;
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

export type PhotoCollectionInput = {
  photoId: Scalars["Int"];
  collectionId: Scalars["Int"];
};

export type PhotoFinishInput = {
  photoId: Scalars["Int"];
  finishId: Scalars["Int"];
};

/** Inputs to create a new Photographer entity. */
export type PhotographerInput = {
  /** Photographer's full name. */
  name: Scalars["String"];
  /** Photographer's first name. */
  firstName: Scalars["String"];
  /** Photographer's last name. */
  lastName: Scalars["String"];
  /** Photographer's email address. */
  email: Scalars["String"];
  /** Short biography for Photographer. Displayed at the top of the Photographer's photo gallery. */
  bio: Scalars["String"];
  /** ID of the image for the Photographer's portrait. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

/** Inputs to update a Photographer entity. */
export type PhotographerUpdateInput = {
  /** Optional: Photographer's full name. */
  name?: Maybe<Scalars["String"]>;
  /** Optional: Photographer's first name. */
  firstName?: Maybe<Scalars["String"]>;
  /** Optional: Photographer's last name. */
  lastName?: Maybe<Scalars["String"]>;
  /** Optional: Photographer's email address. */
  email?: Maybe<Scalars["String"]>;
  /** Optional: Short biography for Photographer. Displayed at the top of the Photographer's photo gallery. */
  bio?: Maybe<Scalars["String"]>;
  /** Inputs to update a Photographer entity. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type GroupedPhotosByPhotographerInput = {
  id?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PaginatedPhotosByPhotographerInput = {
  id?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

export type PhotoInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  isFeatured?: Maybe<Scalars["Boolean"]>;
  isLimitedEdition?: Maybe<Scalars["Boolean"]>;
  rating?: Maybe<Scalars["Int"]>;
  basePrice: Scalars["Float"];
  priceModifier?: Maybe<Scalars["Float"]>;
  photographerId?: Maybe<Scalars["Int"]>;
  locationId?: Maybe<Scalars["Int"]>;
  imageId?: Maybe<Scalars["Int"]>;
};

export type PhotoUpdateInput = {
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  subjects?: Maybe<Array<Scalars["String"]>>;
  tags?: Maybe<Array<Scalars["String"]>>;
  isDiscontinued?: Maybe<Scalars["Boolean"]>;
  isFeatured?: Maybe<Scalars["Boolean"]>;
  isLimitedEdition?: Maybe<Scalars["Boolean"]>;
  rating?: Maybe<Scalars["Int"]>;
  basePrice?: Maybe<Scalars["Float"]>;
  priceModifier?: Maybe<Scalars["Float"]>;
  photographerId?: Maybe<Scalars["Float"]>;
  locationId?: Maybe<Scalars["Float"]>;
};

export type PaginatedPhotosInput = {
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

/** Inputs to create a new Subject entity. */
export type SubjectInput = {
  /** Name of the subject. Used in Photo Info links. */
  name: Scalars["String"];
  /** A vignette used to introduce the subject. */
  description?: Maybe<Scalars["String"]>;
  /** A cover image to be displayed next to the opening vignette. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

/** Optional inputs to be used to update the Subject Info. */
export type SubjectUpdateInput = {
  /** Optional. Name of the subject. Used in Photo Info links. */
  name?: Maybe<Scalars["String"]>;
  /** Optional. A vignette used to introduce the subject. */
  description?: Maybe<Scalars["String"]>;
  /** Optional. A cover image to be displayed next to the opening vignette. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type GroupedPhotosOfSubjectInput = {
  id?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PaginatedPhotosOfSubjectInput = {
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Float"]>;
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

export type TagInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type TagUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type GroupedPhotosWithTagInput = {
  id?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PaginatedPhotosWithTagInput = {
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Float"]>;
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

export type GetApiTokenInput = {
  userId: Scalars["Float"];
  email: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  collections: Array<Collection>;
  collectionsWithPhotos: Array<Collection>;
  collection: Collection;
  collectionWithPhotos: Collection;
  finishes: Array<Finish>;
  finishesWithPhotos: Array<Finish>;
  finish?: Maybe<Finish>;
  finishWithPhotos?: Maybe<Finish>;
  images: Array<Image>;
  image: Image;
  /** Returns all Locations + maps, only. */
  locations: Array<Location>;
  /** Returns one Location + portrait, only or null, if no matching id is found. Meant to be used on the backend. */
  location?: Maybe<Location>;
  /** Returns one Location + portrait, only or null, if no matching name is found. */
  locationWithName?: Maybe<Location>;
  groupedPhotosAtLocation: GroupedPhotosAtLocationResponse;
  paginatedPhotosAtLocation: PaginatedPhotosAtLocationResponse;
  photoCountBySubject: Array<ItemCount>;
  photoCountByTag: Array<ItemCount>;
  photoCountByCollection: Array<ItemCount>;
  photoCountByLocation: Array<ItemCount>;
  photoCountByPhotographer: Array<ItemCount>;
  /** Returns all Photographers + portraits, only. Meant to be used on the backend. */
  photographers: Array<Photographer>;
  /** Returns one Photographer + portrait, only or null, if no matching id is found. Meant to be used on the backend. */
  photographer?: Maybe<Photographer>;
  /** Returns one Photographer + portrait AND Photographer's Photos and related data. Meant to be used on the frontend. Used for the Photographer's Gallery. */
  photographerWithName?: Maybe<Photographer>;
  groupedPhotosByPhotographer: GroupedPhotosByPhotographerResponse;
  paginatedPhotosByPhotographer: PaginatedPhotosByPhotographerResponse;
  photos: Array<Photo>;
  paginatedPhotos: PaginatedPhotoResponse;
  paginatedFeaturedPhotos: PaginatedPhotoResponse;
  photo?: Maybe<Photo>;
  userSearch: Array<UserSearchResult>;
  /** Returns all subjects + cover images only. */
  subjects: Array<Subject>;
  subject?: Maybe<Subject>;
  subjectWithName?: Maybe<Subject>;
  groupedPhotosOfSubject: GroupedPhotosOfSubjectResponse;
  paginatedPhotosOfSubject: PaginatedPhotosOfSubjectResponse;
  tags: Array<Tag>;
  tag: Tag;
  tagWithName?: Maybe<Tag>;
  groupedPhotosWithTag: GroupedPhotosWithTagResponse;
  paginatedPhotosWithTag: PaginatedPhotosWithTagResponse;
  /** Returns all Photos favorited by the signed in User. */
  favorites: FavoritesResponse;
  /** Returns all Photos in the shopping bag of the signed in User. */
  shoppingBagItems: ShoppingBagItemsResponse;
  users: Array<User>;
  user: User;
  userSummaries: Array<User>;
  newsletterSubscribers: Array<User>;
  getUserPreferences: UserPreferencesResponse;
};

export type QueryCollectionArgs = {
  id: Scalars["Int"];
};

export type QueryCollectionWithPhotosArgs = {
  id: Scalars["Int"];
};

export type QueryFinishArgs = {
  id: Scalars["Int"];
};

export type QueryFinishWithPhotosArgs = {
  id: Scalars["Int"];
};

export type QueryImageArgs = {
  id: Scalars["Int"];
};

export type QueryLocationArgs = {
  id: Scalars["Int"];
};

export type QueryLocationWithNameArgs = {
  name: Scalars["String"];
};

export type QueryGroupedPhotosAtLocationArgs = {
  input: GroupedPhotosAtLocationInput;
};

export type QueryPaginatedPhotosAtLocationArgs = {
  input: PaginatedPhotosAtLocationInput;
};

export type QueryPhotographerArgs = {
  id: Scalars["Int"];
};

export type QueryPhotographerWithNameArgs = {
  name: Scalars["String"];
};

export type QueryGroupedPhotosByPhotographerArgs = {
  input: GroupedPhotosByPhotographerInput;
};

export type QueryPaginatedPhotosByPhotographerArgs = {
  input: PaginatedPhotosByPhotographerInput;
};

export type QueryPaginatedPhotosArgs = {
  input: PaginatedPhotosInput;
};

export type QueryPaginatedFeaturedPhotosArgs = {
  input: PaginatedPhotosInput;
};

export type QueryPhotoArgs = {
  id: Scalars["Int"];
};

export type QueryUserSearchArgs = {
  phrase: Scalars["String"];
};

export type QuerySubjectArgs = {
  id: Scalars["Int"];
};

export type QuerySubjectWithNameArgs = {
  name: Scalars["String"];
};

export type QueryGroupedPhotosOfSubjectArgs = {
  input: GroupedPhotosOfSubjectInput;
};

export type QueryPaginatedPhotosOfSubjectArgs = {
  input: PaginatedPhotosOfSubjectInput;
};

export type QueryTagArgs = {
  id: Scalars["Int"];
};

export type QueryTagWithNameArgs = {
  name: Scalars["String"];
};

export type QueryGroupedPhotosWithTagArgs = {
  input: GroupedPhotosWithTagInput;
};

export type QueryPaginatedPhotosWithTagArgs = {
  input: PaginatedPhotosWithTagInput;
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type UserSearchResult = Subject | Tag | Location;

export type Mutation = {
  __typename?: "Mutation";
  addCollection: Collection;
  updateCollection: Collection;
  deleteCollection: Scalars["Boolean"];
  addFinish: Finish;
  updateFinish?: Maybe<Finish>;
  deleteFinish: Scalars["Boolean"];
  addImage: Image;
  updateImage: Image;
  deleteImage: Scalars["Boolean"];
  addImageToPhoto: Image;
  addLocation: Location;
  updateLocation?: Maybe<Location>;
  deleteLocation: Scalars["Boolean"];
  addPhotoToCollection: Scalars["Boolean"];
  removePhotoFromCollection: Scalars["Boolean"];
  addFinishToPhoto: Scalars["Boolean"];
  removeFinishFromPhoto: Scalars["Boolean"];
  addPhotographer: Photographer;
  updatePhotographer?: Maybe<Photographer>;
  deletePhotographer: Scalars["Boolean"];
  addPhoto: Photo;
  updatePhoto: Photo;
  deletePhoto: Scalars["Boolean"];
  addSubject: Subject;
  updateSubject: Subject;
  deleteSubject: Scalars["Boolean"];
  subscribeToNewsletter: SuccessMessageResponse;
  unsubscribeFromNewsletter: SuccessMessageResponse;
  addTag: Tag;
  updateTag: Tag;
  deleteTag: Scalars["Boolean"];
  addPhotoToFavorites: AddPhotoToFavoritesResponse;
  removePhotoFromFavorites: RemovePhotoFromFavoritesResponse;
  addPhotoToShoppingBag: AddPhotoToShoppingBagResponse;
  removePhotoFromShoppingBag: RemovePhotoFromShoppingBagResponse;
  getApiToken: Scalars["String"];
};

export type MutationAddCollectionArgs = {
  input: CollectionInput;
};

export type MutationUpdateCollectionArgs = {
  input: CollectionUpdateInput;
  id: Scalars["Int"];
};

export type MutationDeleteCollectionArgs = {
  id: Scalars["Int"];
};

export type MutationAddFinishArgs = {
  input: FinishInput;
};

export type MutationUpdateFinishArgs = {
  input: FinishUpdateInput;
  id: Scalars["Int"];
};

export type MutationDeleteFinishArgs = {
  id: Scalars["Int"];
};

export type MutationAddImageArgs = {
  input: ImageInput;
};

export type MutationUpdateImageArgs = {
  input: ImageUpdateInput;
  id: Scalars["Int"];
};

export type MutationDeleteImageArgs = {
  id: Scalars["Int"];
};

export type MutationAddImageToPhotoArgs = {
  imageId: Scalars["Int"];
  photoId: Scalars["Int"];
};

export type MutationAddLocationArgs = {
  input: LocationInput;
};

export type MutationUpdateLocationArgs = {
  input: LocationUpdateInput;
  id: Scalars["Int"];
};

export type MutationDeleteLocationArgs = {
  id: Scalars["Int"];
};

export type MutationAddPhotoToCollectionArgs = {
  input: PhotoCollectionInput;
};

export type MutationRemovePhotoFromCollectionArgs = {
  input: PhotoCollectionInput;
};

export type MutationAddFinishToPhotoArgs = {
  input: PhotoFinishInput;
};

export type MutationRemoveFinishFromPhotoArgs = {
  input: PhotoFinishInput;
};

export type MutationAddPhotographerArgs = {
  input: PhotographerInput;
};

export type MutationUpdatePhotographerArgs = {
  input: PhotographerUpdateInput;
  id: Scalars["Int"];
};

export type MutationDeletePhotographerArgs = {
  id: Scalars["Int"];
};

export type MutationAddPhotoArgs = {
  input: PhotoInput;
};

export type MutationUpdatePhotoArgs = {
  input: PhotoUpdateInput;
  id: Scalars["Int"];
};

export type MutationDeletePhotoArgs = {
  id: Scalars["Int"];
};

export type MutationAddSubjectArgs = {
  input: SubjectInput;
};

export type MutationUpdateSubjectArgs = {
  input: SubjectUpdateInput;
  id: Scalars["Int"];
};

export type MutationDeleteSubjectArgs = {
  id: Scalars["Int"];
};

export type MutationAddTagArgs = {
  input: TagInput;
};

export type MutationUpdateTagArgs = {
  input: TagUpdateInput;
  id: Scalars["Int"];
};

export type MutationDeleteTagArgs = {
  id: Scalars["Int"];
};

export type MutationAddPhotoToFavoritesArgs = {
  photoId: Scalars["Float"];
};

export type MutationRemovePhotoFromFavoritesArgs = {
  photoId: Scalars["Float"];
};

export type MutationAddPhotoToShoppingBagArgs = {
  photoId: Scalars["Float"];
};

export type MutationRemovePhotoFromShoppingBagArgs = {
  photoId: Scalars["Float"];
};

export type MutationGetApiTokenArgs = {
  input: GetApiTokenInput;
};

export type ImageInfoFragment = { __typename?: "Image" } & Pick<
  Image,
  | "id"
  | "imageUrl"
  | "altText"
  | "fileType"
  | "fileExtension"
  | "size"
  | "width"
  | "height"
>;

export type GroupedPhotosAtLocationQueryVariables = Exact<{
  input: GroupedPhotosAtLocationInput;
}>;

export type GroupedPhotosAtLocationQuery = { __typename?: "Query" } & {
  groupedPhotosAtLocation: {
    __typename?: "GroupedPhotosAtLocationResponse";
  } & {
    locationInfo: { __typename?: "Location" } & Pick<
      Location,
      "id" | "name" | "tag" | "description"
    > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
    photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
  };
};

export type PaginatedPhotosAtLocationQueryVariables = Exact<{
  input: PaginatedPhotosAtLocationInput;
}>;

export type PaginatedPhotosAtLocationQuery = { __typename?: "Query" } & {
  paginatedPhotosAtLocation: {
    __typename?: "PaginatedPhotosAtLocationResponse";
  } & Pick<
    PaginatedPhotosAtLocationResponse,
    "startCursor" | "endCursor" | "total"
  > & {
      locationInfo: { __typename?: "Location" } & Pick<
        Location,
        "id" | "name" | "tag" | "description"
      > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
      photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type PhotographerInfoFragment = { __typename?: "Photographer" } & Pick<
  Photographer,
  "id" | "name" | "firstName" | "lastName" | "email" | "bio"
> & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };

export type GroupedPhotosByPhotographerQueryVariables = Exact<{
  input: GroupedPhotosByPhotographerInput;
}>;

export type GroupedPhotosByPhotographerQuery = { __typename?: "Query" } & {
  groupedPhotosByPhotographer: {
    __typename?: "GroupedPhotosByPhotographerResponse";
  } & {
    photographerInfo: {
      __typename?: "Photographer";
    } & PhotographerInfoFragment;
    photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
  };
};

export type PaginatedPhotosByPhotographerQueryVariables = Exact<{
  input: PaginatedPhotosByPhotographerInput;
}>;

export type PaginatedPhotosByPhotographerQuery = { __typename?: "Query" } & {
  paginatedPhotosByPhotographer: {
    __typename?: "PaginatedPhotosByPhotographerResponse";
  } & Pick<
    PaginatedPhotosByPhotographerResponse,
    "startCursor" | "endCursor" | "total"
  > & {
      photographerInfo: {
        __typename?: "Photographer";
      } & PhotographerInfoFragment;
      photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type PhotoInfoFragment = { __typename?: "Photo" } & Pick<
  Photo,
  | "id"
  | "rating"
  | "sku"
  | "sortIndex"
  | "title"
  | "description"
  | "isFeatured"
  | "isLimitedEdition"
  | "basePrice"
  | "priceModifier"
> & {
    images?: Maybe<
      Array<
        { __typename?: "Image" } & Pick<
          Image,
          | "id"
          | "imageUrl"
          | "altText"
          | "fileType"
          | "fileExtension"
          | "size"
          | "width"
          | "height"
        >
      >
    >;
    photographer?: Maybe<
      { __typename?: "Photographer" } & Pick<Photographer, "id" | "name">
    >;
    location?: Maybe<
      { __typename?: "Location" } & Pick<Location, "id" | "name">
    >;
    subjectsInPhoto?: Maybe<
      Array<
        { __typename?: "PhotoSubject" } & {
          subject: { __typename?: "Subject" } & Pick<Subject, "id" | "name">;
        }
      >
    >;
    tagsForPhoto?: Maybe<
      Array<
        { __typename?: "PhotoTag" } & {
          tag: { __typename?: "Tag" } & Pick<Tag, "id" | "name">;
        }
      >
    >;
    collectionsForPhoto?: Maybe<
      Array<
        { __typename?: "PhotoCollection" } & {
          collection: { __typename?: "Collection" } & Pick<
            Collection,
            "id" | "name"
          >;
        }
      >
    >;
  };

export type PhotosQueryVariables = Exact<{ [key: string]: never }>;

export type PhotosQuery = { __typename?: "Query" } & {
  photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
};

export type PaginatedPhotosQueryVariables = Exact<{
  input: PaginatedPhotosInput;
}>;

export type PaginatedPhotosQuery = { __typename?: "Query" } & {
  paginatedPhotos: { __typename?: "PaginatedPhotoResponse" } & Pick<
    PaginatedPhotoResponse,
    "startCursor" | "endCursor" | "total"
  > & { photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment> };
};

export type PaginatedFeaturedPhotosQueryVariables = Exact<{
  input: PaginatedPhotosInput;
}>;

export type PaginatedFeaturedPhotosQuery = { __typename?: "Query" } & {
  paginatedFeaturedPhotos: { __typename?: "PaginatedPhotoResponse" } & Pick<
    PaginatedPhotoResponse,
    "startCursor" | "endCursor" | "total"
  > & { photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment> };
};

export type AddPhotoMutationVariables = Exact<{
  input: PhotoInput;
}>;

export type AddPhotoMutation = { __typename?: "Mutation" } & {
  addPhoto: { __typename?: "Photo" } & Pick<
    Photo,
    | "id"
    | "title"
    | "description"
    | "isFeatured"
    | "isLimitedEdition"
    | "isDiscontinued"
    | "rating"
    | "basePrice"
    | "priceModifier"
  > & {
      photographer?: Maybe<
        { __typename?: "Photographer" } & Pick<Photographer, "id" | "name">
      >;
      location?: Maybe<
        { __typename?: "Location" } & Pick<Location, "id" | "name">
      >;
    };
};

export type GroupedPhotosOfSubjectQueryVariables = Exact<{
  input: GroupedPhotosOfSubjectInput;
}>;

export type GroupedPhotosOfSubjectQuery = { __typename?: "Query" } & {
  groupedPhotosOfSubject: { __typename?: "GroupedPhotosOfSubjectResponse" } & {
    subjectInfo: { __typename?: "Subject" } & Pick<
      Subject,
      "id" | "name" | "description" | "createdAt" | "updatedAt"
    > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
    photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
  };
};

export type PaginatedPhotosOfSubjectQueryVariables = Exact<{
  input: PaginatedPhotosOfSubjectInput;
}>;

export type PaginatedPhotosOfSubjectQuery = { __typename?: "Query" } & {
  paginatedPhotosOfSubject: {
    __typename?: "PaginatedPhotosOfSubjectResponse";
  } & Pick<
    PaginatedPhotosOfSubjectResponse,
    "startCursor" | "endCursor" | "total"
  > & {
      subjectInfo: { __typename?: "Subject" } & Pick<
        Subject,
        "id" | "name" | "description" | "createdAt" | "updatedAt"
      > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
      photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type GroupedPhotosWithTagQueryVariables = Exact<{
  input: GroupedPhotosWithTagInput;
}>;

export type GroupedPhotosWithTagQuery = { __typename?: "Query" } & {
  groupedPhotosWithTag: { __typename?: "GroupedPhotosWithTagResponse" } & {
    tagInfo: { __typename?: "Tag" } & Pick<
      Tag,
      "id" | "name" | "description" | "createdAt" | "updatedAt"
    > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
    photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
  };
};

export type PaginatedPhotosWithTagQueryVariables = Exact<{
  input: PaginatedPhotosWithTagInput;
}>;

export type PaginatedPhotosWithTagQuery = { __typename?: "Query" } & {
  paginatedPhotosWithTag: {
    __typename?: "PaginatedPhotosWithTagResponse";
  } & Pick<
    PaginatedPhotosWithTagResponse,
    "startCursor" | "endCursor" | "total"
  > & {
      tagInfo: { __typename?: "Tag" } & Pick<
        Tag,
        "id" | "name" | "description" | "createdAt" | "updatedAt"
      > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
      photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type GetApiTokenMutationVariables = Exact<{
  input: GetApiTokenInput;
}>;

export type GetApiTokenMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "getApiToken"
>;

export type AddPhotoToFavoritesMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type AddPhotoToFavoritesMutation = { __typename?: "Mutation" } & {
  addPhotoToFavorites: { __typename?: "AddPhotoToFavoritesResponse" } & Pick<
    AddPhotoToFavoritesResponse,
    "success" | "message"
  > & { addedPhoto?: Maybe<{ __typename?: "Photo" } & PhotoInfoFragment> };
};

export type RemovePhotoFromFavoritesMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type RemovePhotoFromFavoritesMutation = { __typename?: "Mutation" } & {
  removePhotoFromFavorites: {
    __typename?: "RemovePhotoFromFavoritesResponse";
  } & Pick<RemovePhotoFromFavoritesResponse, "success" | "message"> & {
      removedPhoto?: Maybe<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type AddPhotoToShoppingBagMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type AddPhotoToShoppingBagMutation = { __typename?: "Mutation" } & {
  addPhotoToShoppingBag: {
    __typename?: "AddPhotoToShoppingBagResponse";
  } & Pick<AddPhotoToShoppingBagResponse, "success" | "message"> & {
      addedPhoto?: Maybe<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type RemovePhotoFromShoppingBagMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type RemovePhotoFromShoppingBagMutation = { __typename?: "Mutation" } & {
  removePhotoFromShoppingBag: {
    __typename?: "RemovePhotoFromShoppingBagResponse";
  } & Pick<RemovePhotoFromShoppingBagResponse, "success" | "message"> & {
      removedPhoto?: Maybe<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type FavoritesQueryVariables = Exact<{ [key: string]: never }>;

export type FavoritesQuery = { __typename?: "Query" } & {
  favorites: { __typename?: "FavoritesResponse" } & {
    photoList?: Maybe<Array<{ __typename?: "Photo" } & PhotoInfoFragment>>;
  };
};

export type ShoppingBagItemsQueryVariables = Exact<{ [key: string]: never }>;

export type ShoppingBagItemsQuery = { __typename?: "Query" } & {
  shoppingBagItems: { __typename?: "ShoppingBagItemsResponse" } & {
    photoList?: Maybe<Array<{ __typename?: "Photo" } & PhotoInfoFragment>>;
  };
};

export type GetUserPreferencesQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserPreferencesQuery = { __typename?: "Query" } & {
  getUserPreferences: { __typename?: "UserPreferencesResponse" } & {
    favorites?: Maybe<
      Array<
        { __typename?: "UserFavorite" } & {
          photo: { __typename?: "Photo" } & PhotoInfoFragment;
        }
      >
    >;
    shoppingBagItems?: Maybe<
      Array<
        { __typename?: "UserShoppingBagItem" } & {
          photo: { __typename?: "Photo" } & PhotoInfoFragment;
        }
      >
    >;
  };
};

export const ImageInfoFragmentDoc: DocumentNode<ImageInfoFragment, unknown> = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ImageInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Image" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "imageUrl" } },
          { kind: "Field", name: { kind: "Name", value: "altText" } },
          { kind: "Field", name: { kind: "Name", value: "fileType" } },
          { kind: "Field", name: { kind: "Name", value: "fileExtension" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "width" } },
          { kind: "Field", name: { kind: "Name", value: "height" } },
        ],
      },
    },
  ],
};
export const PhotographerInfoFragmentDoc: DocumentNode<
  PhotographerInfoFragment,
  unknown
> = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PhotographerInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Photographer" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "coverImage" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ImageInfo" },
                },
              ],
            },
          },
        ],
      },
    },
    ...ImageInfoFragmentDoc.definitions,
  ],
};
export const PhotoInfoFragmentDoc: DocumentNode<PhotoInfoFragment, unknown> = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PhotoInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Photo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rating" } },
          { kind: "Field", name: { kind: "Name", value: "sku" } },
          { kind: "Field", name: { kind: "Name", value: "sortIndex" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "isFeatured" } },
          { kind: "Field", name: { kind: "Name", value: "isLimitedEdition" } },
          { kind: "Field", name: { kind: "Name", value: "rating" } },
          { kind: "Field", name: { kind: "Name", value: "basePrice" } },
          { kind: "Field", name: { kind: "Name", value: "priceModifier" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "imageUrl" } },
                { kind: "Field", name: { kind: "Name", value: "altText" } },
                { kind: "Field", name: { kind: "Name", value: "fileType" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fileExtension" },
                },
                { kind: "Field", name: { kind: "Name", value: "size" } },
                { kind: "Field", name: { kind: "Name", value: "width" } },
                { kind: "Field", name: { kind: "Name", value: "height" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "photographer" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "location" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "subjectsInPhoto" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subject" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "tagsForPhoto" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tag" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "collectionsForPhoto" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "collection" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const GroupedPhotosAtLocationDocument: DocumentNode<
  GroupedPhotosAtLocationQuery,
  GroupedPhotosAtLocationQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GroupedPhotosAtLocation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GroupedPhotosAtLocationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "groupedPhotosAtLocation" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "locationInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "tag" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const PaginatedPhotosAtLocationDocument: DocumentNode<
  PaginatedPhotosAtLocationQuery,
  PaginatedPhotosAtLocationQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PaginatedPhotosAtLocation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosAtLocationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "paginatedPhotosAtLocation" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "locationInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "tag" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "startCursor" } },
                { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const GroupedPhotosByPhotographerDocument: DocumentNode<
  GroupedPhotosByPhotographerQuery,
  GroupedPhotosByPhotographerQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "groupedPhotosByPhotographer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GroupedPhotosByPhotographerInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "groupedPhotosByPhotographer" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photographerInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotographerInfo" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotographerInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const PaginatedPhotosByPhotographerDocument: DocumentNode<
  PaginatedPhotosByPhotographerQuery,
  PaginatedPhotosByPhotographerQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "paginatedPhotosByPhotographer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PaginatedPhotosByPhotographerInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "paginatedPhotosByPhotographer" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photographerInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotographerInfo" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "startCursor" } },
                { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
    ...PhotographerInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const PhotosDocument: DocumentNode<PhotosQuery, PhotosQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Photos" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "photos" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "PhotoInfo" },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const PaginatedPhotosDocument: DocumentNode<
  PaginatedPhotosQuery,
  PaginatedPhotosQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "paginatedPhotos" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "paginatedPhotos" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "startCursor" } },
                { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const PaginatedFeaturedPhotosDocument: DocumentNode<
  PaginatedFeaturedPhotosQuery,
  PaginatedFeaturedPhotosQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "paginatedFeaturedPhotos" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "paginatedFeaturedPhotos" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "startCursor" } },
                { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const AddPhotoDocument: DocumentNode<
  AddPhotoMutation,
  AddPhotoMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addPhoto" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PhotoInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addPhoto" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "isFeatured" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isLimitedEdition" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isDiscontinued" },
                },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "basePrice" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "priceModifier" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photographer" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "location" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const GroupedPhotosOfSubjectDocument: DocumentNode<
  GroupedPhotosOfSubjectQuery,
  GroupedPhotosOfSubjectQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "groupedPhotosOfSubject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GroupedPhotosOfSubjectInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "groupedPhotosOfSubject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subjectInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const PaginatedPhotosOfSubjectDocument: DocumentNode<
  PaginatedPhotosOfSubjectQuery,
  PaginatedPhotosOfSubjectQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PaginatedPhotosOfSubject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosOfSubjectInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "paginatedPhotosOfSubject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subjectInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "startCursor" } },
                { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const GroupedPhotosWithTagDocument: DocumentNode<
  GroupedPhotosWithTagQuery,
  GroupedPhotosWithTagQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "groupedPhotosWithTag" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GroupedPhotosWithTagInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "groupedPhotosWithTag" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tagInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const PaginatedPhotosWithTagDocument: DocumentNode<
  PaginatedPhotosWithTagQuery,
  PaginatedPhotosWithTagQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "paginatedPhotosWithTag" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosWithTagInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "paginatedPhotosWithTag" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tagInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "startCursor" } },
                { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                { kind: "Field", name: { kind: "Name", value: "total" } },
              ],
            },
          },
        ],
      },
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const GetApiTokenDocument: DocumentNode<
  GetApiTokenMutation,
  GetApiTokenMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "getApiToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetApiTokenInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getApiToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
export const AddPhotoToFavoritesDocument: DocumentNode<
  AddPhotoToFavoritesMutation,
  AddPhotoToFavoritesMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addPhotoToFavorites" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "photoId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addPhotoToFavorites" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "photoId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "photoId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addedPhoto" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const RemovePhotoFromFavoritesDocument: DocumentNode<
  RemovePhotoFromFavoritesMutation,
  RemovePhotoFromFavoritesMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "removePhotoFromFavorites" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "photoId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removePhotoFromFavorites" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "photoId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "photoId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "removedPhoto" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const AddPhotoToShoppingBagDocument: DocumentNode<
  AddPhotoToShoppingBagMutation,
  AddPhotoToShoppingBagMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addPhotoToShoppingBag" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "photoId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addPhotoToShoppingBag" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "photoId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "photoId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addedPhoto" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const RemovePhotoFromShoppingBagDocument: DocumentNode<
  RemovePhotoFromShoppingBagMutation,
  RemovePhotoFromShoppingBagMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "removePhotoFromShoppingBag" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "photoId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removePhotoFromShoppingBag" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "photoId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "photoId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "removedPhoto" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const FavoritesDocument: DocumentNode<
  FavoritesQuery,
  FavoritesQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "favorites" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "favorites" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photoList" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const ShoppingBagItemsDocument: DocumentNode<
  ShoppingBagItemsQuery,
  ShoppingBagItemsQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "shoppingBagItems" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "shoppingBagItems" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photoList" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const GetUserPreferencesDocument: DocumentNode<
  GetUserPreferencesQuery,
  GetUserPreferencesQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUserPreferences" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUserPreferences" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "favorites" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "photo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "PhotoInfo" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shoppingBagItems" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "photo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "PhotoInfo" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
