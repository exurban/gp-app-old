import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
};

export type Image = {
  __typename?: "Image";
  id: Scalars["ID"];
  imageName: Scalars["String"];
  fileExtension: Scalars["String"];
  imageUrl: Scalars["String"];
  altText: Scalars["String"];
  size: Scalars["String"];
  width: Scalars["Int"];
  height: Scalars["Int"];
  isPortrait: Scalars["Boolean"];
  isPanoramic: Scalars["Boolean"];
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
  /** A description of the location, used as a vignette at the top of the Location's photos page. */
  description: Scalars["String"];
  /** Optional. A map of the location used in conenction with the vignette at the top of the Location's photos page. */
  coverImage?: Maybe<Image>;
  /** Nullable. An array of photos taken at the Location. */
  photos?: Maybe<Array<Photo>>;
  /** Count of photos taken at the location on the site. */
  countOfPhotos: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Collection = {
  __typename?: "Collection";
  id: Scalars["ID"];
  name: Scalars["String"];
  tag: Scalars["String"];
  description: Scalars["String"];
  /** Optional. An image of the tag used in connection with the vignetter at the top of the Tag's photos page. */
  coverImage?: Maybe<Image>;
  photosInCollection?: Maybe<Array<PhotoCollection>>;
  /** Count of photos in the collection. */
  countOfPhotos: Scalars["Int"];
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
  photos?: Maybe<Array<Photo>>;
  /** Count of photos attributed to the photographer on the site. */
  countOfPhotos: Scalars["Int"];
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
  photosOfSubject?: Maybe<Array<PhotoSubject>>;
  /** Count of photos of the subject on the site. */
  countOfPhotos: Scalars["Int"];
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
  description: Scalars["String"];
  /** Optional. An image of the tag used in connection with the vignette at the top of the Tag's photos page. */
  coverImage?: Maybe<Image>;
  /** A connection through a join table to the photos tagged with the tag. */
  photosWithTag?: Maybe<Array<PhotoTag>>;
  /** Count of photos of the tag on the site. */
  countOfPhotos: Scalars["Int"];
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
  /** The name of the finish. */
  name: Scalars["String"];
  /** Optional. A description of the tag used in connection with the vignette for the finish. */
  description?: Maybe<Scalars["String"]>;
  /** Optional. An image of the finish. */
  coverImage?: Maybe<Image>;
  /** SKU for the type of finish. Combined with width & height to create FinishSKU, which is auto-generated as a Field Resolver. ProductSKU = sku-finSku-heightxwidth */
  finSku: Scalars["String"];
  width: Scalars["Float"];
  height: Scalars["Float"];
  depth: Scalars["Float"];
  weight: Scalars["Float"];
  shippingWeight: Scalars["Float"];
  basePrice: Scalars["Float"];
  priceModifier: Scalars["Float"];
  photosWithFinish?: Maybe<Array<PhotoFinish>>;
  /** Count of photos available with the finish. */
  countOfPhotos: Scalars["Int"];
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
  images: Array<Image>;
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

export type SuccessMessageResponse = {
  __typename?: "SuccessMessageResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type SearchCollectionsResponse = {
  __typename?: "SearchCollectionsResponse";
  datalist: Array<Collection>;
};

export type AddCollectionResponse = {
  __typename?: "AddCollectionResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  newCollection?: Maybe<Collection>;
};

export type UpdateCollectionResponse = {
  __typename?: "UpdateCollectionResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  updatedCollection?: Maybe<Collection>;
};

export type AllPhotosInCollectionResponse = {
  __typename?: "AllPhotosInCollectionResponse";
  collectionInfo: Collection;
  total: Scalars["Int"];
  photos: Array<Photo>;
};

export type PaginatedResponse = {
  __typename?: "PaginatedResponse";
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
};

export type SearchFinishesResponse = {
  __typename?: "SearchFinishesResponse";
  datalist: Array<Finish>;
};

export type GroupedPhotosWithFinishResponse = {
  __typename?: "GroupedPhotosWithFinishResponse";
  photos: Array<Photo>;
  finishInfo: Finish;
};

export type PaginatedPhotosWithFinishResponse = {
  __typename?: "PaginatedPhotosWithFinishResponse";
  photos: Array<Photo>;
  pageInfo: PaginatedResponse;
  finishInfo: Finish;
};

export type AddFinishResponse = {
  __typename?: "AddFinishResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  newFinish?: Maybe<Finish>;
};

export type UpdateFinishResponse = {
  __typename?: "UpdateFinishResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  updatedFinish?: Maybe<Finish>;
};

export type AddImageResponse = {
  __typename?: "AddImageResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  newImage?: Maybe<Image>;
};

export type UpdateImageResponse = {
  __typename?: "UpdateImageResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  updatedImage?: Maybe<Image>;
};

export type SearchLocationsResponse = {
  __typename?: "SearchLocationsResponse";
  datalist: Array<Location>;
};

export type LocationsResponse = {
  __typename?: "LocationsResponse";
  locations: Array<Location>;
};

export type AllPhotosAtLocationResponse = {
  __typename?: "AllPhotosAtLocationResponse";
  locationInfo: Location;
  total: Scalars["Int"];
  photos: Array<Photo>;
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

export type AddLocationResponse = {
  __typename?: "AddLocationResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  newLocation?: Maybe<Location>;
};

export type UpdateLocationResponse = {
  __typename?: "UpdateLocationResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  updatedLocation?: Maybe<Location>;
};

export type ItemCountList = {
  __typename?: "ItemCountList";
  itemCountList: Array<ItemCount>;
};

export type ItemCount = {
  __typename?: "ItemCount";
  name?: Maybe<Scalars["String"]>;
  count: Scalars["Int"];
};

export type SearchPhotographersResponse = {
  __typename?: "SearchPhotographersResponse";
  datalist: Array<Photographer>;
};

export type PhotographersResponse = {
  __typename?: "PhotographersResponse";
  photographers: Array<Photographer>;
};

export type AllPhotosByPhotographerResponse = {
  __typename?: "AllPhotosByPhotographerResponse";
  photographerInfo: Photographer;
  total: Scalars["Int"];
  photos: Array<Photo>;
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

export type AddPhotographerResponse = {
  __typename?: "AddPhotographerResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  newPhotographer?: Maybe<Photographer>;
};

export type UpdatePhotographerResponse = {
  __typename?: "UpdatePhotographerResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  updatedPhotographer?: Maybe<Photographer>;
};

export type SelectionOption = {
  __typename?: "SelectionOption";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type PhotosResponse = {
  __typename?: "PhotosResponse";
  photos: Array<Photo>;
};

export type PhotographerSelectionOption = {
  __typename?: "PhotographerSelectionOption";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type LocationSelectionOption = {
  __typename?: "LocationSelectionOption";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type SubjectSelectionOption = {
  __typename?: "SubjectSelectionOption";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type TagSelectionOption = {
  __typename?: "TagSelectionOption";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type CollectionSelectionOption = {
  __typename?: "CollectionSelectionOption";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type FinishSelectionOption = {
  __typename?: "FinishSelectionOption";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type PhotoEditSelectionOptions = {
  __typename?: "PhotoEditSelectionOptions";
  photographers: Array<PhotographerSelectionOption>;
  locations: Array<LocationSelectionOption>;
  subjects: Array<SubjectSelectionOption>;
  tags: Array<TagSelectionOption>;
  collections: Array<CollectionSelectionOption>;
  finishes: Array<FinishSelectionOption>;
};

export type SearchPhotosResponse = {
  __typename?: "SearchPhotosResponse";
  datalist: Array<Photo>;
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

export type AddPhotoResponse = {
  __typename?: "AddPhotoResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  newPhoto?: Maybe<Photo>;
};

export type UpdatePhotoResponse = {
  __typename?: "UpdatePhotoResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  updatedPhoto?: Maybe<Photo>;
};

export type AllFeaturedPhotosResponse = {
  __typename?: "AllFeaturedPhotosResponse";
  total: Scalars["Int"];
  photos: Array<Photo>;
};

export type SubjectsResponse = {
  __typename?: "SubjectsResponse";
  subjects: Array<Subject>;
};

export type SearchSubjectsResponse = {
  __typename?: "SearchSubjectsResponse";
  datalist: Array<Subject>;
};

export type AllPhotosOfSubjectResponse = {
  __typename?: "AllPhotosOfSubjectResponse";
  subjectInfo: Subject;
  total: Scalars["Int"];
  photos: Array<Photo>;
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

export type AddSubjectResponse = {
  __typename?: "AddSubjectResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  newSubject?: Maybe<Subject>;
};

export type UpdateSubjectResponse = {
  __typename?: "UpdateSubjectResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  updatedSubject?: Maybe<Subject>;
};

export type SearchTagsResponse = {
  __typename?: "SearchTagsResponse";
  datalist: Array<Tag>;
};

export type AllPhotosWithTagResponse = {
  __typename?: "AllPhotosWithTagResponse";
  tagInfo: Tag;
  total: Scalars["Int"];
  photos: Array<Photo>;
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

export type AddTagResponse = {
  __typename?: "AddTagResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  newTag?: Maybe<Tag>;
};

export type UpdateTagResponse = {
  __typename?: "UpdateTagResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  updatedTag?: Maybe<Tag>;
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

/** Inputs to create a new Collection. */
export type AddCollectionInput = {
  /** Name of the collection. Used in Photo Info links. */
  name: Scalars["String"];
  tag: Scalars["String"];
  /** A vignette used to introduce the subject. */
  description: Scalars["String"];
  /** A cover image to be displayed next to the opening vignette. */
  coverImageId?: Maybe<Scalars["Int"]>;
};

/** Optional inputs to be used to update the Collection Info. */
export type UpdateCollectionInput = {
  /** Optional. Name of the collection. Used in Photo Info links. */
  name?: Maybe<Scalars["String"]>;
  /** An optional tag for the collection. */
  tag?: Maybe<Scalars["String"]>;
  /** Optional. A vignette used to introduce the subject. */
  description?: Maybe<Scalars["String"]>;
  /** Optional. A cover image to be displayed next to the opening vignette. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type SearchCollectionsInput = {
  searchString: Scalars["String"];
};

export type AllPhotosInCollectionInput = {
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Float"]>;
};

export type AddFinishInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  coverImageId?: Maybe<Scalars["Float"]>;
  finSku: Scalars["String"];
  width: Scalars["Float"];
  height: Scalars["Float"];
  depth: Scalars["Float"];
  weight: Scalars["Float"];
  shippingWeight: Scalars["Float"];
  basePrice: Scalars["Float"];
  priceModifier: Scalars["Float"];
};

export type UpdateFinishInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  coverImageId?: Maybe<Scalars["Float"]>;
  finSku?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Float"]>;
  height?: Maybe<Scalars["Float"]>;
  depth?: Maybe<Scalars["Float"]>;
  weight?: Maybe<Scalars["Float"]>;
  shippingWeight?: Maybe<Scalars["Float"]>;
  basePrice?: Maybe<Scalars["Float"]>;
  priceModifier?: Maybe<Scalars["Float"]>;
};

export type SearchFinishesInput = {
  searchString: Scalars["String"];
};

export type GroupedPhotosWithFinishInput = {
  id?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PaginatedPhotosWithFinishInput = {
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Float"]>;
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

export type AddImageInput = {
  imageName?: Maybe<Scalars["String"]>;
  fileExtension?: Maybe<Scalars["String"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  altText?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  photoId?: Maybe<Scalars["Float"]>;
};

export type UpdateImageInput = {
  imageName?: Maybe<Scalars["String"]>;
  fileExtension?: Maybe<Scalars["String"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  altText?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  photoId?: Maybe<Scalars["Float"]>;
};

/** Inputs to create a new Location entity. */
export type AddLocationInput = {
  /** Name of the location. */
  name: Scalars["String"];
  /** Tag used to ID the location in Photo Info links. */
  tag: Scalars["String"];
  /** Vignette describing the location. */
  description: Scalars["String"];
  /** id for cover image. */
  coverImageId?: Maybe<Scalars["Int"]>;
};

/** Optional inputs to be used to update the Location Info. */
export type UpdateLocationInput = {
  /** Optional. Name of the Location. */
  name?: Maybe<Scalars["String"]>;
  /** Optional. Tag used to identify the Location. */
  tag?: Maybe<Scalars["String"]>;
  /** Vignette describing the location. */
  description?: Maybe<Scalars["String"]>;
  /** Map of the location. Used at the top of the Location's Photo Gallery. Used to look up the Map and add it to the One-to-One relationship. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type SearchLocationsInput = {
  searchString: Scalars["String"];
};

export type LocationSearchSortInput = {
  filter?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Scalars["String"]>;
  direction?: Maybe<SortDirection>;
};

/** Sort direction */
export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC"
}

export type AllPhotosAtLocationInput = {
  name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Float"]>;
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
export type AddPhotographerInput = {
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
  /** id for cover image. */
  coverImageId?: Maybe<Scalars["Int"]>;
};

/** Inputs to update a Photographer entity. */
export type UpdatePhotographerInput = {
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
  /** id for cover image. */
  coverImageId?: Maybe<Scalars["Int"]>;
};

export type SearchPhotographersInput = {
  searchString: Scalars["String"];
};

export type AllPhotosByPhotographerInput = {
  id?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
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

export type AddPhotoInput = {
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  isFeatured?: Maybe<Scalars["Boolean"]>;
  isLimitedEdition?: Maybe<Scalars["Boolean"]>;
  rating?: Maybe<Scalars["Int"]>;
  basePrice?: Maybe<Scalars["Float"]>;
  priceModifier?: Maybe<Scalars["Float"]>;
  photographerId?: Maybe<Scalars["Int"]>;
  locationId?: Maybe<Scalars["Int"]>;
  subjectIds?: Maybe<Array<Scalars["Int"]>>;
  tagIds?: Maybe<Array<Scalars["Int"]>>;
  collectionIds?: Maybe<Array<Scalars["Int"]>>;
  finishIds?: Maybe<Array<Scalars["Int"]>>;
  imageId?: Maybe<Scalars["Int"]>;
};

export type UpdatePhotoInput = {
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  isDiscontinued?: Maybe<Scalars["Boolean"]>;
  isFeatured?: Maybe<Scalars["Boolean"]>;
  isLimitedEdition?: Maybe<Scalars["Boolean"]>;
  rating?: Maybe<Scalars["Int"]>;
  basePrice?: Maybe<Scalars["Float"]>;
  priceModifier?: Maybe<Scalars["Float"]>;
  imageId?: Maybe<Scalars["Int"]>;
  photographerId?: Maybe<Scalars["Int"]>;
  locationId?: Maybe<Scalars["Int"]>;
  subjectIds?: Maybe<Array<Scalars["Int"]>>;
  tagIds?: Maybe<Array<Scalars["Int"]>>;
  collectionIds?: Maybe<Array<Scalars["Int"]>>;
  finishIds?: Maybe<Array<Scalars["Int"]>>;
};

export type PhotoSearchSortInput = {
  filter?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Scalars["String"]>;
  direction?: Maybe<SortDirection>;
};

export type SearchPhotosInput = {
  searchString: Scalars["String"];
};

export type PaginatedPhotosInput = {
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

/** Inputs to create a new Subject entity. */
export type AddSubjectInput = {
  /** Name of the subject. Used in Photo Info links. */
  name: Scalars["String"];
  /** A vignette used to introduce the subject. */
  description?: Maybe<Scalars["String"]>;
  /** A cover image to be displayed next to the opening vignette. */
  coverImageId?: Maybe<Scalars["Int"]>;
};

/** Optional inputs to be used to update the Subject Info. */
export type UpdateSubjectInput = {
  /** Optional. Name of the subject. Used in Photo Info links. */
  name?: Maybe<Scalars["String"]>;
  /** Optional. A vignette used to introduce the subject. */
  description?: Maybe<Scalars["String"]>;
  /** Optional. A cover image to be displayed next to the opening vignette. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type SubjectSearchSortInput = {
  filter?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Scalars["String"]>;
  direction?: Maybe<SortDirection>;
};

export type SearchSubjectsInput = {
  searchString: Scalars["String"];
};

export type AllPhotosOfSubjectInput = {
  name: Scalars["String"];
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

/** Inputs to create a new Tag entity. */
export type AddTagInput = {
  /** Name of the tag. Used in Photo Info links. */
  name: Scalars["String"];
  /** A vignette used to introduce the tag. */
  description: Scalars["String"];
  /** A cover image to be displayed nest to the opening vignette. */
  coverImageId?: Maybe<Scalars["Int"]>;
};

/** Optional inputs to be used to update the Tag Info. */
export type UpdateTagInput = {
  /** Optional. Name of the tag. Used in Photo Info links. */
  name?: Maybe<Scalars["String"]>;
  /** Optional. A vignette used to introduce the subject. */
  description?: Maybe<Scalars["String"]>;
  /** Optional. A cover image to be displayed next to the opening vignette. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type SearchTagsInput = {
  searchString: Scalars["String"];
};

export type AllPhotosWithTagInput = {
  id?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
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
  /** Search collections. Returns Collection + Cover Image. */
  searchCollections: SearchCollectionsResponse;
  collectionsWithPhotos: Array<Collection>;
  collection: Collection;
  collectionWithPhotos: Collection;
  allPhotosInCollection: AllPhotosInCollectionResponse;
  /** Search Finishes. Returns Finish + Cover Image. */
  searchFinishes: SearchFinishesResponse;
  finish: Finish;
  groupedPhotosWithFinish: GroupedPhotosWithFinishResponse;
  paginatedPhotosWithFinish: PaginatedPhotosWithFinishResponse;
  images: Array<Image>;
  image: Image;
  /** Returns all Locations + cover images. Sortable and filterable. */
  locations: LocationsResponse;
  /** Search locations. Returns Location + Cover Image. */
  searchLocations: SearchLocationsResponse;
  /** Returns one Location + portrait, only or null, if no matching id is found. Meant to be used on the backend. */
  location?: Maybe<Location>;
  /** Returns one Location + portrait, only or null, if no matching name is found. */
  locationWithName?: Maybe<Location>;
  groupedPhotosAtLocation: GroupedPhotosAtLocationResponse;
  paginatedPhotosAtLocation: PaginatedPhotosAtLocationResponse;
  allPhotosAtLocation: AllPhotosAtLocationResponse;
  photoCountBySubject: ItemCountList;
  photoCountByTag: ItemCountList;
  photoCountByCollection: ItemCountList;
  photoCountByLocation: ItemCountList;
  photoCountByPhotographer: ItemCountList;
  /** Returns all Photographers + portraits, only. Meant to be used on the backend. */
  searchPhotographers: SearchPhotographersResponse;
  /** Returns all Photographers + portraits, only. Meant to be used on the backend. */
  sortedPhotographers: PhotographersResponse;
  /** Returns one Photographer + portrait, only or null, if no matching id is found. Meant to be used on the backend. */
  photographer?: Maybe<Photographer>;
  /** Returns one Photographer + portrait AND Photographer's Photos and related data. Meant to be used on the frontend. Used for the Photographer's Gallery. */
  photographerWithName?: Maybe<Photographer>;
  groupedPhotosByPhotographer: GroupedPhotosByPhotographerResponse;
  paginatedPhotosByPhotographer: PaginatedPhotosByPhotographerResponse;
  allPhotosByPhotographer: AllPhotosByPhotographerResponse;
  /** Returns all Photos + all relations. Sortable and filterable. */
  photos: PhotosResponse;
  /** Returns all Photos + all relations. Searchable. */
  searchPhotos: SearchPhotosResponse;
  paginatedPhotos: PaginatedAllPhotosResponse;
  paginatedFeaturedPhotos: PaginatedFeaturedPhotosResponse;
  allFeaturedPhotos: AllFeaturedPhotosResponse;
  photo?: Maybe<Photo>;
  photoWithSku: Photo;
  photoEditOptions: PhotoEditSelectionOptions;
  userSearch: Array<UserSearchResult>;
  /** Returns all Subjects + cover images. Sortable and filterable. */
  subjects: SubjectsResponse;
  /** Search subjects. Returns Subjects + Cover Image. */
  searchSubjects: SearchSubjectsResponse;
  subject?: Maybe<Subject>;
  subjectWithName?: Maybe<Subject>;
  groupedPhotosOfSubject: GroupedPhotosOfSubjectResponse;
  paginatedPhotosOfSubject: PaginatedPhotosOfSubjectResponse;
  allPhotosOfSubject: AllPhotosOfSubjectResponse;
  /** Search tags. Returns tag + Cover Image. */
  searchTags: SearchTagsResponse;
  tag: Tag;
  tagWithName?: Maybe<Tag>;
  groupedPhotosWithTag: GroupedPhotosWithTagResponse;
  paginatedPhotosWithTag: PaginatedPhotosWithTagResponse;
  allPhotosWithTag: AllPhotosWithTagResponse;
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

export type QuerySearchCollectionsArgs = {
  input: SearchCollectionsInput;
};

export type QueryCollectionArgs = {
  id: Scalars["Int"];
};

export type QueryCollectionWithPhotosArgs = {
  id: Scalars["Int"];
};

export type QueryAllPhotosInCollectionArgs = {
  input: AllPhotosInCollectionInput;
};

export type QuerySearchFinishesArgs = {
  input: SearchFinishesInput;
};

export type QueryFinishArgs = {
  id: Scalars["Int"];
};

export type QueryGroupedPhotosWithFinishArgs = {
  input: GroupedPhotosWithFinishInput;
};

export type QueryPaginatedPhotosWithFinishArgs = {
  input: PaginatedPhotosWithFinishInput;
};

export type QueryImageArgs = {
  id: Scalars["Int"];
};

export type QueryLocationsArgs = {
  input: LocationSearchSortInput;
};

export type QuerySearchLocationsArgs = {
  input: SearchLocationsInput;
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

export type QueryAllPhotosAtLocationArgs = {
  input: AllPhotosAtLocationInput;
};

export type QuerySearchPhotographersArgs = {
  input: SearchPhotographersInput;
};

export type QuerySortedPhotographersArgs = {
  asc: Scalars["Boolean"];
  orderBy: Scalars["String"];
  filter: Scalars["String"];
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

export type QueryAllPhotosByPhotographerArgs = {
  input: AllPhotosByPhotographerInput;
};

export type QueryPhotosArgs = {
  input: PhotoSearchSortInput;
};

export type QuerySearchPhotosArgs = {
  input: SearchPhotosInput;
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

export type QueryPhotoWithSkuArgs = {
  sku: Scalars["Int"];
};

export type QueryUserSearchArgs = {
  phrase: Scalars["String"];
};

export type QuerySubjectsArgs = {
  input: SubjectSearchSortInput;
};

export type QuerySearchSubjectsArgs = {
  input: SearchSubjectsInput;
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

export type QueryAllPhotosOfSubjectArgs = {
  input: AllPhotosOfSubjectInput;
};

export type QuerySearchTagsArgs = {
  input: SearchTagsInput;
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

export type QueryAllPhotosWithTagArgs = {
  input: AllPhotosWithTagInput;
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type UserSearchResult = Subject | Tag | Location;

export type Mutation = {
  __typename?: "Mutation";
  addCollection: AddCollectionResponse;
  updateCollection: UpdateCollectionResponse;
  deleteCollection: Scalars["Boolean"];
  addFinish: AddFinishResponse;
  updateFinish: UpdateFinishResponse;
  deleteFinish: Scalars["Boolean"];
  addImage: AddImageResponse;
  updateImage: UpdateImageResponse;
  deleteImage: Scalars["Boolean"];
  addImageToPhoto: Image;
  addLocation: AddLocationResponse;
  updateLocation: UpdateLocationResponse;
  deleteLocation: Scalars["Boolean"];
  addPhotoToCollection: Scalars["Boolean"];
  removePhotoFromCollection: Scalars["Boolean"];
  addFinishToPhoto: Scalars["Boolean"];
  removeFinishFromPhoto: Scalars["Boolean"];
  addPhotographer: AddPhotographerResponse;
  updatePhotographer: UpdatePhotographerResponse;
  deletePhotographer: Scalars["Boolean"];
  addPhoto: AddPhotoResponse;
  updatePhoto: UpdatePhotoResponse;
  deletePhoto: Scalars["Boolean"];
  addSubject: AddSubjectResponse;
  updateSubject: UpdateSubjectResponse;
  deleteSubject: Scalars["Boolean"];
  subscribeToNewsletter: SuccessMessageResponse;
  unsubscribeFromNewsletter: SuccessMessageResponse;
  addTag: AddTagResponse;
  updateTag: UpdateTagResponse;
  deleteTag: Scalars["Boolean"];
  addPhotoToFavorites: AddPhotoToFavoritesResponse;
  removePhotoFromFavorites: RemovePhotoFromFavoritesResponse;
  addPhotoToShoppingBag: AddPhotoToShoppingBagResponse;
  removePhotoFromShoppingBag: RemovePhotoFromShoppingBagResponse;
  getApiToken: Scalars["String"];
};

export type MutationAddCollectionArgs = {
  input: AddCollectionInput;
};

export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
  id: Scalars["Int"];
};

export type MutationDeleteCollectionArgs = {
  id: Scalars["Int"];
};

export type MutationAddFinishArgs = {
  input: AddFinishInput;
};

export type MutationUpdateFinishArgs = {
  input: UpdateFinishInput;
  id: Scalars["Int"];
};

export type MutationDeleteFinishArgs = {
  id: Scalars["Int"];
};

export type MutationAddImageArgs = {
  input: AddImageInput;
};

export type MutationUpdateImageArgs = {
  input: UpdateImageInput;
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
  input: AddLocationInput;
};

export type MutationUpdateLocationArgs = {
  input: UpdateLocationInput;
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
  input: AddPhotographerInput;
};

export type MutationUpdatePhotographerArgs = {
  input: UpdatePhotographerInput;
  id: Scalars["Int"];
};

export type MutationDeletePhotographerArgs = {
  id: Scalars["Int"];
};

export type MutationAddPhotoArgs = {
  input: AddPhotoInput;
};

export type MutationUpdatePhotoArgs = {
  input: UpdatePhotoInput;
  id: Scalars["Int"];
};

export type MutationDeletePhotoArgs = {
  id: Scalars["Int"];
};

export type MutationAddSubjectArgs = {
  input: AddSubjectInput;
};

export type MutationUpdateSubjectArgs = {
  input: UpdateSubjectInput;
  id: Scalars["Int"];
};

export type MutationDeleteSubjectArgs = {
  id: Scalars["Int"];
};

export type MutationAddTagArgs = {
  input: AddTagInput;
};

export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
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

export type AllPhotosInCollectionQueryVariables = Exact<{
  input: AllPhotosInCollectionInput;
}>;

export type AllPhotosInCollectionQuery = { __typename?: "Query" } & {
  allPhotosInCollection: {
    __typename?: "AllPhotosInCollectionResponse";
  } & Pick<AllPhotosInCollectionResponse, "total"> & {
      collectionInfo: { __typename?: "Collection" } & Pick<
        Collection,
        "id" | "name" | "description"
      > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
      photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type ImageInfoFragment = { __typename?: "Image" } & Pick<
  Image,
  | "id"
  | "imageName"
  | "fileExtension"
  | "imageUrl"
  | "altText"
  | "size"
  | "width"
  | "height"
  | "isPortrait"
  | "isPanoramic"
>;

export type AllPhotosAtLocationQueryVariables = Exact<{
  input: AllPhotosAtLocationInput;
}>;

export type AllPhotosAtLocationQuery = { __typename?: "Query" } & {
  allPhotosAtLocation: { __typename?: "AllPhotosAtLocationResponse" } & Pick<
    AllPhotosAtLocationResponse,
    "total"
  > & {
      locationInfo: { __typename?: "Location" } & Pick<Location, "id" | "name" | "description"> & {
          coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment>;
        };
      photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

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

export type AllPhotosByPhotographerQueryVariables = Exact<{
  input: AllPhotosByPhotographerInput;
}>;

export type AllPhotosByPhotographerQuery = { __typename?: "Query" } & {
  allPhotosByPhotographer: {
    __typename?: "AllPhotosByPhotographerResponse";
  } & Pick<AllPhotosByPhotographerResponse, "total"> & {
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
    images: Array<
      { __typename?: "Image" } & Pick<
        Image,
        | "id"
        | "imageName"
        | "fileExtension"
        | "imageUrl"
        | "altText"
        | "size"
        | "width"
        | "height"
        | "isPortrait"
        | "isPanoramic"
      >
    >;
    photographer?: Maybe<{ __typename?: "Photographer" } & Pick<Photographer, "id" | "name">>;
    location?: Maybe<{ __typename?: "Location" } & Pick<Location, "id" | "name">>;
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
          collection: { __typename?: "Collection" } & Pick<Collection, "id" | "name">;
        }
      >
    >;
    finishesForPhoto?: Maybe<
      Array<
        { __typename?: "PhotoFinish" } & {
          finish: { __typename?: "Finish" } & Pick<Finish, "id" | "name" | "finishSku">;
        }
      >
    >;
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

export type AllFeaturedPhotosQueryVariables = Exact<{ [key: string]: never }>;

export type AllFeaturedPhotosQuery = { __typename?: "Query" } & {
  allFeaturedPhotos: { __typename?: "AllFeaturedPhotosResponse" } & Pick<
    AllFeaturedPhotosResponse,
    "total"
  > & { photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment> };
};

export type PhotoWithSkuQueryVariables = Exact<{
  sku: Scalars["Int"];
}>;

export type PhotoWithSkuQuery = { __typename?: "Query" } & {
  photoWithSku: { __typename?: "Photo" } & PhotoInfoFragment;
};

export type AllPhotosOfSubjectQueryVariables = Exact<{
  input: AllPhotosOfSubjectInput;
}>;

export type AllPhotosOfSubjectQuery = { __typename?: "Query" } & {
  allPhotosOfSubject: { __typename?: "AllPhotosOfSubjectResponse" } & Pick<
    AllPhotosOfSubjectResponse,
    "total"
  > & {
      subjectInfo: { __typename?: "Subject" } & Pick<Subject, "id" | "name" | "description"> & {
          coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment>;
        };
      photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
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

export type AllPhotosWithTagQueryVariables = Exact<{
  input: AllPhotosWithTagInput;
}>;

export type AllPhotosWithTagQuery = { __typename?: "Query" } & {
  allPhotosWithTag: { __typename?: "AllPhotosWithTagResponse" } & Pick<
    AllPhotosWithTagResponse,
    "total"
  > & {
      tagInfo: { __typename?: "Tag" } & Pick<Tag, "id" | "name" | "description"> & {
          coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment>;
        };
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

export type GetApiTokenMutation = { __typename?: "Mutation" } & Pick<Mutation, "getApiToken">;

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
  } & Pick<RemovePhotoFromFavoritesResponse, "success" | "message" | "removedPhotoWithId">;
};

export type AddPhotoToShoppingBagMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type AddPhotoToShoppingBagMutation = { __typename?: "Mutation" } & {
  addPhotoToShoppingBag: {
    __typename?: "AddPhotoToShoppingBagResponse";
  } & Pick<AddPhotoToShoppingBagResponse, "success" | "message" | "addedPhotoWithId">;
};

export type RemovePhotoFromShoppingBagMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type RemovePhotoFromShoppingBagMutation = { __typename?: "Mutation" } & {
  removePhotoFromShoppingBag: {
    __typename?: "RemovePhotoFromShoppingBagResponse";
  } & Pick<RemovePhotoFromShoppingBagResponse, "success" | "message" | "removedPhotoWithId">;
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
        name: { kind: "Name", value: "Image" }
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "imageName" } },
          { kind: "Field", name: { kind: "Name", value: "fileExtension" } },
          { kind: "Field", name: { kind: "Name", value: "imageUrl" } },
          { kind: "Field", name: { kind: "Name", value: "altText" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "width" } },
          { kind: "Field", name: { kind: "Name", value: "height" } },
          { kind: "Field", name: { kind: "Name", value: "isPortrait" } },
          { kind: "Field", name: { kind: "Name", value: "isPanoramic" } }
        ]
      }
    }
  ]
};
export const PhotographerInfoFragmentDoc: DocumentNode<PhotographerInfoFragment, unknown> = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PhotographerInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Photographer" }
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
                  name: { kind: "Name", value: "ImageInfo" }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions
  ]
};
export const PhotoInfoFragmentDoc: DocumentNode<PhotoInfoFragment, unknown> = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PhotoInfo" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Photo" }
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
                { kind: "Field", name: { kind: "Name", value: "imageName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fileExtension" }
                },
                { kind: "Field", name: { kind: "Name", value: "imageUrl" } },
                { kind: "Field", name: { kind: "Name", value: "altText" } },
                { kind: "Field", name: { kind: "Name", value: "size" } },
                { kind: "Field", name: { kind: "Name", value: "width" } },
                { kind: "Field", name: { kind: "Name", value: "height" } },
                { kind: "Field", name: { kind: "Name", value: "isPortrait" } },
                { kind: "Field", name: { kind: "Name", value: "isPanoramic" } }
              ]
            }
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "photographer" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } }
              ]
            }
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "location" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } }
              ]
            }
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
                      { kind: "Field", name: { kind: "Name", value: "name" } }
                    ]
                  }
                }
              ]
            }
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
                      { kind: "Field", name: { kind: "Name", value: "name" } }
                    ]
                  }
                }
              ]
            }
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
                      { kind: "Field", name: { kind: "Name", value: "name" } }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "finishesForPhoto" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "finish" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "finishSku" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
};
export const AllPhotosInCollectionDocument: DocumentNode<
  AllPhotosInCollectionQuery,
  AllPhotosInCollectionQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allPhotosInCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AllPhotosInCollectionInput" }
            }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allPhotosInCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" }
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "collectionInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
};
export const AllPhotosAtLocationDocument: DocumentNode<
  AllPhotosAtLocationQuery,
  AllPhotosAtLocationQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allPhotosAtLocation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AllPhotosAtLocationInput" }
            }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allPhotosAtLocation" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" }
                }
              }
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosAtLocationInput" }
            }
          }
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
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
                        name: { kind: "Name", value: "description" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" }
                      },
                      { kind: "Field", name: { kind: "Name", value: "total" } }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
};
export const AllPhotosByPhotographerDocument: DocumentNode<
  AllPhotosByPhotographerQuery,
  AllPhotosByPhotographerQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allPhotosByPhotographer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AllPhotosByPhotographerInput" }
            }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allPhotosByPhotographer" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" }
                }
              }
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
                        name: { kind: "Name", value: "PhotographerInfo" }
                      }
                    ]
                  }
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotographerInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PaginatedPhotosByPhotographerInput"
              }
            }
          }
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
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
                        name: { kind: "Name", value: "PhotographerInfo" }
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" }
                      },
                      { kind: "Field", name: { kind: "Name", value: "total" } }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotographerInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosInput" }
            }
          }
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" }
                      },
                      { kind: "Field", name: { kind: "Name", value: "total" } }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotoInfoFragmentDoc.definitions
  ]
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosInput" }
            }
          }
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" }
                      },
                      { kind: "Field", name: { kind: "Name", value: "total" } }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotoInfoFragmentDoc.definitions
  ]
};
export const AllFeaturedPhotosDocument: DocumentNode<
  AllFeaturedPhotosQuery,
  AllFeaturedPhotosQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allFeaturedPhotos" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allFeaturedPhotos" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "total" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotoInfoFragmentDoc.definitions
  ]
};
export const PhotoWithSkuDocument: DocumentNode<PhotoWithSkuQuery, PhotoWithSkuQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "photoWithSku" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sku" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "photoWithSku" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sku" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sku" }
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "PhotoInfo" }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotoInfoFragmentDoc.definitions
  ]
};
export const AllPhotosOfSubjectDocument: DocumentNode<
  AllPhotosOfSubjectQuery,
  AllPhotosOfSubjectQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allPhotosOfSubject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AllPhotosOfSubjectInput" }
            }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allPhotosOfSubject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" }
                }
              }
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
                        name: { kind: "Name", value: "description" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GroupedPhotosOfSubjectInput" }
            }
          }
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
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
                        name: { kind: "Name", value: "description" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" }
                            }
                          ]
                        }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" }
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosOfSubjectInput" }
            }
          }
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
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
                        name: { kind: "Name", value: "description" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" }
                            }
                          ]
                        }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" }
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" }
                      },
                      { kind: "Field", name: { kind: "Name", value: "total" } }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
};
export const AllPhotosWithTagDocument: DocumentNode<
  AllPhotosWithTagQuery,
  AllPhotosWithTagQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allPhotosWithTag" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AllPhotosWithTagInput" }
            }
          }
        }
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allPhotosWithTag" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" }
                }
              }
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
                        name: { kind: "Name", value: "description" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PaginatedPhotosWithTagInput" }
            }
          }
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
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
                        name: { kind: "Name", value: "description" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coverImage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "ImageInfo" }
                            }
                          ]
                        }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" }
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" }
                      },
                      { kind: "Field", name: { kind: "Name", value: "total" } }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...ImageInfoFragmentDoc.definitions,
    ...PhotoInfoFragmentDoc.definitions
  ]
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetApiTokenInput" }
            }
          }
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
            ]
          }
        ]
      }
    }
  ]
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
            name: { kind: "Name", value: "photoId" }
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }
          }
        }
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
                  name: { kind: "Name", value: "photoId" }
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addedPhotoWithId" }
                }
              ]
            }
          }
        ]
      }
    }
  ]
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
            name: { kind: "Name", value: "photoId" }
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }
          }
        }
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
                  name: { kind: "Name", value: "photoId" }
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "removedPhotoWithId" }
                }
              ]
            }
          }
        ]
      }
    }
  ]
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
            name: { kind: "Name", value: "photoId" }
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }
          }
        }
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
                  name: { kind: "Name", value: "photoId" }
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addedPhotoWithId" }
                }
              ]
            }
          }
        ]
      }
    }
  ]
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
            name: { kind: "Name", value: "photoId" }
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }
          }
        }
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
                  name: { kind: "Name", value: "photoId" }
                }
              }
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "removedPhotoWithId" }
                }
              ]
            }
          }
        ]
      }
    }
  ]
};
export const FavoritesDocument: DocumentNode<FavoritesQuery, FavoritesQueryVariables> = {
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
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotoInfoFragmentDoc.definitions
  ]
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
                        name: { kind: "Name", value: "PhotoInfo" }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotoInfoFragmentDoc.definitions
  ]
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
                              name: { kind: "Name", value: "PhotoInfo" }
                            }
                          ]
                        }
                      }
                    ]
                  }
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
                              name: { kind: "Name", value: "PhotoInfo" }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    ...PhotoInfoFragmentDoc.definitions
  ]
};
