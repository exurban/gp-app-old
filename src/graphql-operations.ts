import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
} from "@apollo/client/cache";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
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

export type PaginatedResponse = {
  __typename?: "PaginatedResponse";
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
};

export type GroupedPhotosAtLocationResponse = {
  __typename?: "GroupedPhotosAtLocationResponse";
  photos: Array<Photo>;
  locationInfo: Location;
};

export type PaginatedPhotosAtLocationResponse = {
  __typename?: "PaginatedPhotosAtLocationResponse";
  photos: Array<Photo>;
  pageInfo: PaginatedResponse;
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
  pageInfo: PaginatedResponse;
  photographerInfo: Photographer;
};

export type PaginatedAllPhotosResponse = {
  __typename?: "PaginatedAllPhotosResponse";
  photos: Array<Photo>;
  pageInfo: PaginatedResponse;
};

export type PaginatedFeaturedPhotosResponse = {
  __typename?: "PaginatedFeaturedPhotosResponse";
  photos: Array<Photo>;
  pageInfo: PaginatedResponse;
};

export type GroupedPhotosOfSubjectResponse = {
  __typename?: "GroupedPhotosOfSubjectResponse";
  photos: Array<Photo>;
  subjectInfo: Subject;
};

export type PaginatedPhotosOfSubjectResponse = {
  __typename?: "PaginatedPhotosOfSubjectResponse";
  photos: Array<Photo>;
  pageInfo: PaginatedResponse;
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
  pageInfo: PaginatedResponse;
  tagInfo: Tag;
};

export type FavoritesResponse = {
  __typename?: "FavoritesResponse";
  /** Returns list of Photo objects in user's favorites. */
  photoList?: Maybe<Array<Photo>>;
};

export type AddPhotoToFavoritesResponse = {
  __typename?: "AddPhotoToFavoritesResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  addedPhotoWithId?: Maybe<Scalars["ID"]>;
};

export type RemovePhotoFromFavoritesResponse = {
  __typename?: "RemovePhotoFromFavoritesResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  removedPhotoWithId?: Maybe<Scalars["ID"]>;
};

export type ShoppingBagItemsResponse = {
  __typename?: "ShoppingBagItemsResponse";
  /** Returns list of Photo objects in user's shopping bag. */
  photoList?: Maybe<Array<Photo>>;
};

export type AddPhotoToShoppingBagResponse = {
  __typename?: "AddPhotoToShoppingBagResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  addedPhotoWithId?: Maybe<Scalars["ID"]>;
};

export type RemovePhotoFromShoppingBagResponse = {
  __typename?: "RemovePhotoFromShoppingBagResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  removedPhotoWithId?: Maybe<Scalars["ID"]>;
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
  paginatedPhotos: PaginatedAllPhotosResponse;
  paginatedFeaturedPhotos: PaginatedFeaturedPhotosResponse;
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

export type PaginatedPhotosAtLocationQueryVariables = Exact<{
  input: PaginatedPhotosAtLocationInput;
}>;

export type PaginatedPhotosAtLocationQuery = { __typename?: "Query" } & {
  paginatedPhotosAtLocation: {
    __typename?: "PaginatedPhotosAtLocationResponse";
  } & {
    locationInfo: { __typename?: "Location" } & Pick<
      Location,
      "id" | "name" | "tag" | "description"
    > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
    pageInfo: { __typename?: "PaginatedResponse" } & Pick<
      PaginatedResponse,
      "startCursor" | "endCursor" | "total"
    >;
    photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
  };
};

export type PhotographerInfoFragment = { __typename?: "Photographer" } & Pick<
  Photographer,
  "id" | "name" | "firstName" | "lastName" | "email" | "bio"
> & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };

export type PaginatedPhotosByPhotographerQueryVariables = Exact<{
  input: PaginatedPhotosByPhotographerInput;
}>;

export type PaginatedPhotosByPhotographerQuery = { __typename?: "Query" } & {
  paginatedPhotosByPhotographer: {
    __typename?: "PaginatedPhotosByPhotographerResponse";
  } & {
    photographerInfo: {
      __typename?: "Photographer";
    } & PhotographerInfoFragment;
    pageInfo: { __typename?: "PaginatedResponse" } & Pick<
      PaginatedResponse,
      "startCursor" | "endCursor" | "total"
    >;
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
  paginatedPhotos: { __typename?: "PaginatedAllPhotosResponse" } & {
    pageInfo: { __typename?: "PaginatedResponse" } & Pick<
      PaginatedResponse,
      "startCursor" | "endCursor" | "total"
    >;
    photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
  };
};

export type PaginatedFeaturedPhotosQueryVariables = Exact<{
  input: PaginatedPhotosInput;
}>;

export type PaginatedFeaturedPhotosQuery = { __typename?: "Query" } & {
  paginatedFeaturedPhotos: {
    __typename?: "PaginatedFeaturedPhotosResponse";
  } & {
    pageInfo: { __typename?: "PaginatedResponse" } & Pick<
      PaginatedResponse,
      "startCursor" | "endCursor" | "total"
    >;
    photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
  };
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
  } & {
    subjectInfo: { __typename?: "Subject" } & Pick<
      Subject,
      "id" | "name" | "description" | "createdAt" | "updatedAt"
    > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
    pageInfo: { __typename?: "PaginatedResponse" } & Pick<
      PaginatedResponse,
      "startCursor" | "endCursor" | "total"
    >;
    photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
  };
};

export type PaginatedPhotosWithTagQueryVariables = Exact<{
  input: PaginatedPhotosWithTagInput;
}>;

export type PaginatedPhotosWithTagQuery = { __typename?: "Query" } & {
  paginatedPhotosWithTag: { __typename?: "PaginatedPhotosWithTagResponse" } & {
    tagInfo: { __typename?: "Tag" } & Pick<
      Tag,
      "id" | "name" | "description" | "createdAt" | "updatedAt"
    > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
    pageInfo: { __typename?: "PaginatedResponse" } & Pick<
      PaginatedResponse,
      "startCursor" | "endCursor" | "total"
    >;
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
    "success" | "message" | "addedPhotoWithId"
  >;
};

export type RemovePhotoFromFavoritesMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type RemovePhotoFromFavoritesMutation = { __typename?: "Mutation" } & {
  removePhotoFromFavorites: {
    __typename?: "RemovePhotoFromFavoritesResponse";
  } & Pick<
    RemovePhotoFromFavoritesResponse,
    "success" | "message" | "removedPhotoWithId"
  >;
};

export type AddPhotoToShoppingBagMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type AddPhotoToShoppingBagMutation = { __typename?: "Mutation" } & {
  addPhotoToShoppingBag: {
    __typename?: "AddPhotoToShoppingBagResponse";
  } & Pick<
    AddPhotoToShoppingBagResponse,
    "success" | "message" | "addedPhotoWithId"
  >;
};

export type RemovePhotoFromShoppingBagMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type RemovePhotoFromShoppingBagMutation = { __typename?: "Mutation" } & {
  removePhotoFromShoppingBag: {
    __typename?: "RemovePhotoFromShoppingBagResponse";
  } & Pick<
    RemovePhotoFromShoppingBagResponse,
    "success" | "message" | "removedPhotoWithId"
  >;
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
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "imageUrl" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "altText" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "fileType" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "fileExtension" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "size" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "width" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "height" },
            arguments: [],
            directives: [],
          },
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
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "name" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "firstName" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "lastName" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "email" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "bio" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "coverImage" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ImageInfo" },
                  directives: [],
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
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "rating" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sku" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sortIndex" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "title" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "description" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "isFeatured" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "isLimitedEdition" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "rating" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "basePrice" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "priceModifier" },
            arguments: [],
            directives: [],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "id" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "imageUrl" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "altText" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fileType" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fileExtension" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "size" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "width" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "height" },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "photographer" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "id" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "name" },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "location" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "id" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "name" },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "subjectsInPhoto" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subject" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "tagsForPhoto" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tag" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "collectionsForPhoto" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "collection" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
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
      name: { kind: "Name", value: "paginatedPhotosAtLocation" },
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "locationInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tag" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                              directives: [],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "total" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photographerInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotographerInfo" },
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "total" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
export const PhotosDocument: DocumentNode<PhotosQuery, PhotosQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Photos" },
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "photos" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "PhotoInfo" },
                  directives: [],
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "total" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "total" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "id" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "title" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "description" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isFeatured" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isLimitedEdition" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isDiscontinued" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rating" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "basePrice" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "priceModifier" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photographer" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "location" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subjectInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                              directives: [],
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
      name: { kind: "Name", value: "paginatedPhotosOfSubject" },
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subjectInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                              directives: [],
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "total" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tagInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" },
                              directives: [],
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "total" },
                        arguments: [],
                        directives: [],
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "success" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "message" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addedPhotoWithId" },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
        ],
      },
    },
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "success" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "message" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "removedPhotoWithId" },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
        ],
      },
    },
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "success" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "message" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addedPhotoWithId" },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
        ],
      },
    },
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
          directives: [],
        },
      ],
      directives: [],
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "success" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "message" },
                  arguments: [],
                  directives: [],
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "removedPhotoWithId" },
                  arguments: [],
                  directives: [],
                },
              ],
            },
          },
        ],
      },
    },
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
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "favorites" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photoList" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "shoppingBagItems" },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photoList" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: [],
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
export type ImageKeySpecifier = (
  | "id"
  | "imageUrl"
  | "altText"
  | "fileType"
  | "fileExtension"
  | "size"
  | "width"
  | "height"
  | "photo"
  | "createdAt"
  | "updatedAt"
  | ImageKeySpecifier
)[];
export type ImageFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  imageUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  altText?: FieldPolicy<any> | FieldReadFunction<any>;
  fileType?: FieldPolicy<any> | FieldReadFunction<any>;
  fileExtension?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  photo?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LocationKeySpecifier = (
  | "id"
  | "name"
  | "tag"
  | "description"
  | "coverImage"
  | "photos"
  | "createdAt"
  | "updatedAt"
  | LocationKeySpecifier
)[];
export type LocationFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  tag?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  coverImage?: FieldPolicy<any> | FieldReadFunction<any>;
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectionKeySpecifier = (
  | "id"
  | "name"
  | "tag"
  | "description"
  | "coverImage"
  | "photosInCollection"
  | "createdAt"
  | "updatedAt"
  | CollectionKeySpecifier
)[];
export type CollectionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  tag?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  coverImage?: FieldPolicy<any> | FieldReadFunction<any>;
  photosInCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PhotoCollectionKeySpecifier = (
  | "collectionId"
  | "collection"
  | "photoId"
  | "photo"
  | PhotoCollectionKeySpecifier
)[];
export type PhotoCollectionFieldPolicy = {
  collectionId?: FieldPolicy<any> | FieldReadFunction<any>;
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  photoId?: FieldPolicy<any> | FieldReadFunction<any>;
  photo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PhotographerKeySpecifier = (
  | "id"
  | "name"
  | "firstName"
  | "lastName"
  | "email"
  | "coverImage"
  | "bio"
  | "photos"
  | "createdAt"
  | "updatedAt"
  | PhotographerKeySpecifier
)[];
export type PhotographerFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  firstName?: FieldPolicy<any> | FieldReadFunction<any>;
  lastName?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  coverImage?: FieldPolicy<any> | FieldReadFunction<any>;
  bio?: FieldPolicy<any> | FieldReadFunction<any>;
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubjectKeySpecifier = (
  | "id"
  | "name"
  | "description"
  | "coverImage"
  | "photosOfSubject"
  | "createdAt"
  | "updatedAt"
  | SubjectKeySpecifier
)[];
export type SubjectFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  coverImage?: FieldPolicy<any> | FieldReadFunction<any>;
  photosOfSubject?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PhotoSubjectKeySpecifier = (
  | "subjectId"
  | "subject"
  | "photoId"
  | "photo"
  | PhotoSubjectKeySpecifier
)[];
export type PhotoSubjectFieldPolicy = {
  subjectId?: FieldPolicy<any> | FieldReadFunction<any>;
  subject?: FieldPolicy<any> | FieldReadFunction<any>;
  photoId?: FieldPolicy<any> | FieldReadFunction<any>;
  photo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TagKeySpecifier = (
  | "id"
  | "name"
  | "description"
  | "coverImage"
  | "photosWithTag"
  | "createdAt"
  | "updatedAt"
  | TagKeySpecifier
)[];
export type TagFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  coverImage?: FieldPolicy<any> | FieldReadFunction<any>;
  photosWithTag?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PhotoTagKeySpecifier = (
  | "tagId"
  | "tag"
  | "photoId"
  | "photo"
  | PhotoTagKeySpecifier
)[];
export type PhotoTagFieldPolicy = {
  tagId?: FieldPolicy<any> | FieldReadFunction<any>;
  tag?: FieldPolicy<any> | FieldReadFunction<any>;
  photoId?: FieldPolicy<any> | FieldReadFunction<any>;
  photo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserShoppingBagItemKeySpecifier = (
  | "userId"
  | "user"
  | "photoId"
  | "photo"
  | UserShoppingBagItemKeySpecifier
)[];
export type UserShoppingBagItemFieldPolicy = {
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  photoId?: FieldPolicy<any> | FieldReadFunction<any>;
  photo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FinishKeySpecifier = (
  | "id"
  | "name"
  | "description"
  | "photoUrl"
  | "finSku"
  | "width"
  | "height"
  | "depth"
  | "weight"
  | "shippingWeight"
  | "basePrice"
  | "priceModifier"
  | "photosWithFinish"
  | "createdAt"
  | "updatedAt"
  | "finishSku"
  | FinishKeySpecifier
)[];
export type FinishFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  photoUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  finSku?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  depth?: FieldPolicy<any> | FieldReadFunction<any>;
  weight?: FieldPolicy<any> | FieldReadFunction<any>;
  shippingWeight?: FieldPolicy<any> | FieldReadFunction<any>;
  basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
  priceModifier?: FieldPolicy<any> | FieldReadFunction<any>;
  photosWithFinish?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  finishSku?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PhotoFinishKeySpecifier = (
  | "finishId"
  | "finish"
  | "photoId"
  | "photo"
  | PhotoFinishKeySpecifier
)[];
export type PhotoFinishFieldPolicy = {
  finishId?: FieldPolicy<any> | FieldReadFunction<any>;
  finish?: FieldPolicy<any> | FieldReadFunction<any>;
  photoId?: FieldPolicy<any> | FieldReadFunction<any>;
  photo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PhotoKeySpecifier = (
  | "id"
  | "skuGenerator"
  | "sku"
  | "sortIndex"
  | "title"
  | "description"
  | "isFeatured"
  | "isLimitedEdition"
  | "isDiscontinued"
  | "rating"
  | "basePrice"
  | "priceModifier"
  | "photographer"
  | "location"
  | "images"
  | "subjectsInPhoto"
  | "tagsForPhoto"
  | "collectionsForPhoto"
  | "finishesForPhoto"
  | "favoritedByUsers"
  | "inShoppingBagsOfUsers"
  | "createdAt"
  | "updatedAt"
  | PhotoKeySpecifier
)[];
export type PhotoFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  skuGenerator?: FieldPolicy<any> | FieldReadFunction<any>;
  sku?: FieldPolicy<any> | FieldReadFunction<any>;
  sortIndex?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  isFeatured?: FieldPolicy<any> | FieldReadFunction<any>;
  isLimitedEdition?: FieldPolicy<any> | FieldReadFunction<any>;
  isDiscontinued?: FieldPolicy<any> | FieldReadFunction<any>;
  rating?: FieldPolicy<any> | FieldReadFunction<any>;
  basePrice?: FieldPolicy<any> | FieldReadFunction<any>;
  priceModifier?: FieldPolicy<any> | FieldReadFunction<any>;
  photographer?: FieldPolicy<any> | FieldReadFunction<any>;
  location?: FieldPolicy<any> | FieldReadFunction<any>;
  images?: FieldPolicy<any> | FieldReadFunction<any>;
  subjectsInPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  tagsForPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  collectionsForPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  finishesForPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  favoritedByUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  inShoppingBagsOfUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserFavoriteKeySpecifier = (
  | "userId"
  | "user"
  | "photoId"
  | "photo"
  | UserFavoriteKeySpecifier
)[];
export type UserFavoriteFieldPolicy = {
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  photoId?: FieldPolicy<any> | FieldReadFunction<any>;
  photo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | "id"
  | "name"
  | "email"
  | "email_verified"
  | "image"
  | "roles"
  | "isSubscribed"
  | "userFavorites"
  | "userShoppingBagItems"
  | "createdAt"
  | "updatedAt"
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  email_verified?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  roles?: FieldPolicy<any> | FieldReadFunction<any>;
  isSubscribed?: FieldPolicy<any> | FieldReadFunction<any>;
  userFavorites?: FieldPolicy<any> | FieldReadFunction<any>;
  userShoppingBagItems?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedResponseKeySpecifier = (
  | "startCursor"
  | "endCursor"
  | "total"
  | PaginatedResponseKeySpecifier
)[];
export type PaginatedResponseFieldPolicy = {
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GroupedPhotosAtLocationResponseKeySpecifier = (
  | "photos"
  | "locationInfo"
  | GroupedPhotosAtLocationResponseKeySpecifier
)[];
export type GroupedPhotosAtLocationResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  locationInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPhotosAtLocationResponseKeySpecifier = (
  | "photos"
  | "pageInfo"
  | "locationInfo"
  | PaginatedPhotosAtLocationResponseKeySpecifier
)[];
export type PaginatedPhotosAtLocationResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  locationInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ItemCountKeySpecifier = (
  | "name"
  | "count"
  | ItemCountKeySpecifier
)[];
export type ItemCountFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  count?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GroupedPhotosByPhotographerResponseKeySpecifier = (
  | "photos"
  | "photographerInfo"
  | GroupedPhotosByPhotographerResponseKeySpecifier
)[];
export type GroupedPhotosByPhotographerResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  photographerInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPhotosByPhotographerResponseKeySpecifier = (
  | "photos"
  | "pageInfo"
  | "photographerInfo"
  | PaginatedPhotosByPhotographerResponseKeySpecifier
)[];
export type PaginatedPhotosByPhotographerResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  photographerInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedAllPhotosResponseKeySpecifier = (
  | "photos"
  | "pageInfo"
  | PaginatedAllPhotosResponseKeySpecifier
)[];
export type PaginatedAllPhotosResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedFeaturedPhotosResponseKeySpecifier = (
  | "photos"
  | "pageInfo"
  | PaginatedFeaturedPhotosResponseKeySpecifier
)[];
export type PaginatedFeaturedPhotosResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GroupedPhotosOfSubjectResponseKeySpecifier = (
  | "photos"
  | "subjectInfo"
  | GroupedPhotosOfSubjectResponseKeySpecifier
)[];
export type GroupedPhotosOfSubjectResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  subjectInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPhotosOfSubjectResponseKeySpecifier = (
  | "photos"
  | "pageInfo"
  | "subjectInfo"
  | PaginatedPhotosOfSubjectResponseKeySpecifier
)[];
export type PaginatedPhotosOfSubjectResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  subjectInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SuccessMessageResponseKeySpecifier = (
  | "success"
  | "message"
  | SuccessMessageResponseKeySpecifier
)[];
export type SuccessMessageResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GroupedPhotosWithTagResponseKeySpecifier = (
  | "photos"
  | "tagInfo"
  | GroupedPhotosWithTagResponseKeySpecifier
)[];
export type GroupedPhotosWithTagResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  tagInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PaginatedPhotosWithTagResponseKeySpecifier = (
  | "photos"
  | "pageInfo"
  | "tagInfo"
  | PaginatedPhotosWithTagResponseKeySpecifier
)[];
export type PaginatedPhotosWithTagResponseFieldPolicy = {
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  tagInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FavoritesResponseKeySpecifier = (
  | "photoList"
  | FavoritesResponseKeySpecifier
)[];
export type FavoritesResponseFieldPolicy = {
  photoList?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AddPhotoToFavoritesResponseKeySpecifier = (
  | "success"
  | "message"
  | "addedPhotoWithId"
  | AddPhotoToFavoritesResponseKeySpecifier
)[];
export type AddPhotoToFavoritesResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  addedPhotoWithId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RemovePhotoFromFavoritesResponseKeySpecifier = (
  | "success"
  | "message"
  | "removedPhotoWithId"
  | RemovePhotoFromFavoritesResponseKeySpecifier
)[];
export type RemovePhotoFromFavoritesResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  removedPhotoWithId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ShoppingBagItemsResponseKeySpecifier = (
  | "photoList"
  | ShoppingBagItemsResponseKeySpecifier
)[];
export type ShoppingBagItemsResponseFieldPolicy = {
  photoList?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AddPhotoToShoppingBagResponseKeySpecifier = (
  | "success"
  | "message"
  | "addedPhotoWithId"
  | AddPhotoToShoppingBagResponseKeySpecifier
)[];
export type AddPhotoToShoppingBagResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  addedPhotoWithId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RemovePhotoFromShoppingBagResponseKeySpecifier = (
  | "success"
  | "message"
  | "removedPhotoWithId"
  | RemovePhotoFromShoppingBagResponseKeySpecifier
)[];
export type RemovePhotoFromShoppingBagResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  removedPhotoWithId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserPreferencesResponseKeySpecifier = (
  | "favorites"
  | "shoppingBagItems"
  | UserPreferencesResponseKeySpecifier
)[];
export type UserPreferencesResponseFieldPolicy = {
  favorites?: FieldPolicy<any> | FieldReadFunction<any>;
  shoppingBagItems?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "collections"
  | "collectionsWithPhotos"
  | "collection"
  | "collectionWithPhotos"
  | "finishes"
  | "finishesWithPhotos"
  | "finish"
  | "finishWithPhotos"
  | "images"
  | "image"
  | "locations"
  | "location"
  | "locationWithName"
  | "groupedPhotosAtLocation"
  | "paginatedPhotosAtLocation"
  | "photoCountBySubject"
  | "photoCountByTag"
  | "photoCountByCollection"
  | "photoCountByLocation"
  | "photoCountByPhotographer"
  | "photographers"
  | "photographer"
  | "photographerWithName"
  | "groupedPhotosByPhotographer"
  | "paginatedPhotosByPhotographer"
  | "photos"
  | "paginatedPhotos"
  | "paginatedFeaturedPhotos"
  | "photo"
  | "userSearch"
  | "subjects"
  | "subject"
  | "subjectWithName"
  | "groupedPhotosOfSubject"
  | "paginatedPhotosOfSubject"
  | "tags"
  | "tag"
  | "tagWithName"
  | "groupedPhotosWithTag"
  | "paginatedPhotosWithTag"
  | "favorites"
  | "shoppingBagItems"
  | "users"
  | "user"
  | "userSummaries"
  | "newsletterSubscribers"
  | "getUserPreferences"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  collections?: FieldPolicy<any> | FieldReadFunction<any>;
  collectionsWithPhotos?: FieldPolicy<any> | FieldReadFunction<any>;
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  collectionWithPhotos?: FieldPolicy<any> | FieldReadFunction<any>;
  finishes?: FieldPolicy<any> | FieldReadFunction<any>;
  finishesWithPhotos?: FieldPolicy<any> | FieldReadFunction<any>;
  finish?: FieldPolicy<any> | FieldReadFunction<any>;
  finishWithPhotos?: FieldPolicy<any> | FieldReadFunction<any>;
  images?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  locations?: FieldPolicy<any> | FieldReadFunction<any>;
  location?: FieldPolicy<any> | FieldReadFunction<any>;
  locationWithName?: FieldPolicy<any> | FieldReadFunction<any>;
  groupedPhotosAtLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  paginatedPhotosAtLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  photoCountBySubject?: FieldPolicy<any> | FieldReadFunction<any>;
  photoCountByTag?: FieldPolicy<any> | FieldReadFunction<any>;
  photoCountByCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  photoCountByLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  photoCountByPhotographer?: FieldPolicy<any> | FieldReadFunction<any>;
  photographers?: FieldPolicy<any> | FieldReadFunction<any>;
  photographer?: FieldPolicy<any> | FieldReadFunction<any>;
  photographerWithName?: FieldPolicy<any> | FieldReadFunction<any>;
  groupedPhotosByPhotographer?: FieldPolicy<any> | FieldReadFunction<any>;
  paginatedPhotosByPhotographer?: FieldPolicy<any> | FieldReadFunction<any>;
  photos?: FieldPolicy<any> | FieldReadFunction<any>;
  paginatedPhotos?: FieldPolicy<any> | FieldReadFunction<any>;
  paginatedFeaturedPhotos?: FieldPolicy<any> | FieldReadFunction<any>;
  photo?: FieldPolicy<any> | FieldReadFunction<any>;
  userSearch?: FieldPolicy<any> | FieldReadFunction<any>;
  subjects?: FieldPolicy<any> | FieldReadFunction<any>;
  subject?: FieldPolicy<any> | FieldReadFunction<any>;
  subjectWithName?: FieldPolicy<any> | FieldReadFunction<any>;
  groupedPhotosOfSubject?: FieldPolicy<any> | FieldReadFunction<any>;
  paginatedPhotosOfSubject?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  tag?: FieldPolicy<any> | FieldReadFunction<any>;
  tagWithName?: FieldPolicy<any> | FieldReadFunction<any>;
  groupedPhotosWithTag?: FieldPolicy<any> | FieldReadFunction<any>;
  paginatedPhotosWithTag?: FieldPolicy<any> | FieldReadFunction<any>;
  favorites?: FieldPolicy<any> | FieldReadFunction<any>;
  shoppingBagItems?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userSummaries?: FieldPolicy<any> | FieldReadFunction<any>;
  newsletterSubscribers?: FieldPolicy<any> | FieldReadFunction<any>;
  getUserPreferences?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "addCollection"
  | "updateCollection"
  | "deleteCollection"
  | "addFinish"
  | "updateFinish"
  | "deleteFinish"
  | "addImage"
  | "updateImage"
  | "deleteImage"
  | "addImageToPhoto"
  | "addLocation"
  | "updateLocation"
  | "deleteLocation"
  | "addPhotoToCollection"
  | "removePhotoFromCollection"
  | "addFinishToPhoto"
  | "removeFinishFromPhoto"
  | "addPhotographer"
  | "updatePhotographer"
  | "deletePhotographer"
  | "addPhoto"
  | "updatePhoto"
  | "deletePhoto"
  | "addSubject"
  | "updateSubject"
  | "deleteSubject"
  | "subscribeToNewsletter"
  | "unsubscribeFromNewsletter"
  | "addTag"
  | "updateTag"
  | "deleteTag"
  | "addPhotoToFavorites"
  | "removePhotoFromFavorites"
  | "addPhotoToShoppingBag"
  | "removePhotoFromShoppingBag"
  | "getApiToken"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  addCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  updateCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  addFinish?: FieldPolicy<any> | FieldReadFunction<any>;
  updateFinish?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteFinish?: FieldPolicy<any> | FieldReadFunction<any>;
  addImage?: FieldPolicy<any> | FieldReadFunction<any>;
  updateImage?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteImage?: FieldPolicy<any> | FieldReadFunction<any>;
  addImageToPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  addLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  updateLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  addPhotoToCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  removePhotoFromCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  addFinishToPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  removeFinishFromPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  addPhotographer?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePhotographer?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePhotographer?: FieldPolicy<any> | FieldReadFunction<any>;
  addPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  addSubject?: FieldPolicy<any> | FieldReadFunction<any>;
  updateSubject?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteSubject?: FieldPolicy<any> | FieldReadFunction<any>;
  subscribeToNewsletter?: FieldPolicy<any> | FieldReadFunction<any>;
  unsubscribeFromNewsletter?: FieldPolicy<any> | FieldReadFunction<any>;
  addTag?: FieldPolicy<any> | FieldReadFunction<any>;
  updateTag?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTag?: FieldPolicy<any> | FieldReadFunction<any>;
  addPhotoToFavorites?: FieldPolicy<any> | FieldReadFunction<any>;
  removePhotoFromFavorites?: FieldPolicy<any> | FieldReadFunction<any>;
  addPhotoToShoppingBag?: FieldPolicy<any> | FieldReadFunction<any>;
  removePhotoFromShoppingBag?: FieldPolicy<any> | FieldReadFunction<any>;
  getApiToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
  Image?: {
    keyFields?:
      | false
      | ImageKeySpecifier
      | (() => undefined | ImageKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: ImageFieldPolicy;
  };
  Location?: {
    keyFields?:
      | false
      | LocationKeySpecifier
      | (() => undefined | LocationKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: LocationFieldPolicy;
  };
  Collection?: {
    keyFields?:
      | false
      | CollectionKeySpecifier
      | (() => undefined | CollectionKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: CollectionFieldPolicy;
  };
  PhotoCollection?: {
    keyFields?:
      | false
      | PhotoCollectionKeySpecifier
      | (() => undefined | PhotoCollectionKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PhotoCollectionFieldPolicy;
  };
  Photographer?: {
    keyFields?:
      | false
      | PhotographerKeySpecifier
      | (() => undefined | PhotographerKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PhotographerFieldPolicy;
  };
  Subject?: {
    keyFields?:
      | false
      | SubjectKeySpecifier
      | (() => undefined | SubjectKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: SubjectFieldPolicy;
  };
  PhotoSubject?: {
    keyFields?:
      | false
      | PhotoSubjectKeySpecifier
      | (() => undefined | PhotoSubjectKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PhotoSubjectFieldPolicy;
  };
  Tag?: {
    keyFields?: false | TagKeySpecifier | (() => undefined | TagKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: TagFieldPolicy;
  };
  PhotoTag?: {
    keyFields?:
      | false
      | PhotoTagKeySpecifier
      | (() => undefined | PhotoTagKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PhotoTagFieldPolicy;
  };
  UserShoppingBagItem?: {
    keyFields?:
      | false
      | UserShoppingBagItemKeySpecifier
      | (() => undefined | UserShoppingBagItemKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserShoppingBagItemFieldPolicy;
  };
  Finish?: {
    keyFields?:
      | false
      | FinishKeySpecifier
      | (() => undefined | FinishKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: FinishFieldPolicy;
  };
  PhotoFinish?: {
    keyFields?:
      | false
      | PhotoFinishKeySpecifier
      | (() => undefined | PhotoFinishKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PhotoFinishFieldPolicy;
  };
  Photo?: {
    keyFields?:
      | false
      | PhotoKeySpecifier
      | (() => undefined | PhotoKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PhotoFieldPolicy;
  };
  UserFavorite?: {
    keyFields?:
      | false
      | UserFavoriteKeySpecifier
      | (() => undefined | UserFavoriteKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserFavoriteFieldPolicy;
  };
  User?: {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserFieldPolicy;
  };
  PaginatedResponse?: {
    keyFields?:
      | false
      | PaginatedResponseKeySpecifier
      | (() => undefined | PaginatedResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PaginatedResponseFieldPolicy;
  };
  GroupedPhotosAtLocationResponse?: {
    keyFields?:
      | false
      | GroupedPhotosAtLocationResponseKeySpecifier
      | (() => undefined | GroupedPhotosAtLocationResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: GroupedPhotosAtLocationResponseFieldPolicy;
  };
  PaginatedPhotosAtLocationResponse?: {
    keyFields?:
      | false
      | PaginatedPhotosAtLocationResponseKeySpecifier
      | (() => undefined | PaginatedPhotosAtLocationResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PaginatedPhotosAtLocationResponseFieldPolicy;
  };
  ItemCount?: {
    keyFields?:
      | false
      | ItemCountKeySpecifier
      | (() => undefined | ItemCountKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: ItemCountFieldPolicy;
  };
  GroupedPhotosByPhotographerResponse?: {
    keyFields?:
      | false
      | GroupedPhotosByPhotographerResponseKeySpecifier
      | (() => undefined | GroupedPhotosByPhotographerResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: GroupedPhotosByPhotographerResponseFieldPolicy;
  };
  PaginatedPhotosByPhotographerResponse?: {
    keyFields?:
      | false
      | PaginatedPhotosByPhotographerResponseKeySpecifier
      | (() => undefined | PaginatedPhotosByPhotographerResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PaginatedPhotosByPhotographerResponseFieldPolicy;
  };
  PaginatedAllPhotosResponse?: {
    keyFields?:
      | false
      | PaginatedAllPhotosResponseKeySpecifier
      | (() => undefined | PaginatedAllPhotosResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PaginatedAllPhotosResponseFieldPolicy;
  };
  PaginatedFeaturedPhotosResponse?: {
    keyFields?:
      | false
      | PaginatedFeaturedPhotosResponseKeySpecifier
      | (() => undefined | PaginatedFeaturedPhotosResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PaginatedFeaturedPhotosResponseFieldPolicy;
  };
  GroupedPhotosOfSubjectResponse?: {
    keyFields?:
      | false
      | GroupedPhotosOfSubjectResponseKeySpecifier
      | (() => undefined | GroupedPhotosOfSubjectResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: GroupedPhotosOfSubjectResponseFieldPolicy;
  };
  PaginatedPhotosOfSubjectResponse?: {
    keyFields?:
      | false
      | PaginatedPhotosOfSubjectResponseKeySpecifier
      | (() => undefined | PaginatedPhotosOfSubjectResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PaginatedPhotosOfSubjectResponseFieldPolicy;
  };
  SuccessMessageResponse?: {
    keyFields?:
      | false
      | SuccessMessageResponseKeySpecifier
      | (() => undefined | SuccessMessageResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: SuccessMessageResponseFieldPolicy;
  };
  GroupedPhotosWithTagResponse?: {
    keyFields?:
      | false
      | GroupedPhotosWithTagResponseKeySpecifier
      | (() => undefined | GroupedPhotosWithTagResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: GroupedPhotosWithTagResponseFieldPolicy;
  };
  PaginatedPhotosWithTagResponse?: {
    keyFields?:
      | false
      | PaginatedPhotosWithTagResponseKeySpecifier
      | (() => undefined | PaginatedPhotosWithTagResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PaginatedPhotosWithTagResponseFieldPolicy;
  };
  FavoritesResponse?: {
    keyFields?:
      | false
      | FavoritesResponseKeySpecifier
      | (() => undefined | FavoritesResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: FavoritesResponseFieldPolicy;
  };
  AddPhotoToFavoritesResponse?: {
    keyFields?:
      | false
      | AddPhotoToFavoritesResponseKeySpecifier
      | (() => undefined | AddPhotoToFavoritesResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: AddPhotoToFavoritesResponseFieldPolicy;
  };
  RemovePhotoFromFavoritesResponse?: {
    keyFields?:
      | false
      | RemovePhotoFromFavoritesResponseKeySpecifier
      | (() => undefined | RemovePhotoFromFavoritesResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: RemovePhotoFromFavoritesResponseFieldPolicy;
  };
  ShoppingBagItemsResponse?: {
    keyFields?:
      | false
      | ShoppingBagItemsResponseKeySpecifier
      | (() => undefined | ShoppingBagItemsResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: ShoppingBagItemsResponseFieldPolicy;
  };
  AddPhotoToShoppingBagResponse?: {
    keyFields?:
      | false
      | AddPhotoToShoppingBagResponseKeySpecifier
      | (() => undefined | AddPhotoToShoppingBagResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: AddPhotoToShoppingBagResponseFieldPolicy;
  };
  RemovePhotoFromShoppingBagResponse?: {
    keyFields?:
      | false
      | RemovePhotoFromShoppingBagResponseKeySpecifier
      | (() => undefined | RemovePhotoFromShoppingBagResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: RemovePhotoFromShoppingBagResponseFieldPolicy;
  };
  UserPreferencesResponse?: {
    keyFields?:
      | false
      | UserPreferencesResponseKeySpecifier
      | (() => undefined | UserPreferencesResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserPreferencesResponseFieldPolicy;
  };
  Query?: {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: QueryFieldPolicy;
  };
  Mutation?: {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: MutationFieldPolicy;
  };
};
