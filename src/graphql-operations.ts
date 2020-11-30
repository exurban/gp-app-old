import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
  DateTime: string;
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
  /** Derived field that returns `${firstName} ${lastName}` */
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

export type PaginatedPhotosAtLocationResponse = {
  __typename?: "PaginatedPhotosAtLocationResponse";
  items: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
  locationInfo: Location;
};

export type PaginatedPhotosByPhotographerResponse = {
  __typename?: "PaginatedPhotosByPhotographerResponse";
  items: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
  photographerInfo: Photographer;
};

export type PaginatedPhotoResponse = {
  __typename?: "PaginatedPhotoResponse";
  items: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
};

export type PaginatedPhotosOfSubjectResponse = {
  __typename?: "PaginatedPhotosOfSubjectResponse";
  items: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
  subjectInfo: Subject;
};

export type PaginatedPhotosOfTagResponse = {
  __typename?: "PaginatedPhotosOfTagResponse";
  items: Array<Photo>;
  startCursor: Scalars["Int"];
  endCursor: Scalars["Int"];
  total: Scalars["Int"];
  tagInfo: Tag;
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
  name: Scalars["String"];
  tag: Scalars["String"];
  /** Vignette describing the location. */
  description?: Maybe<Scalars["String"]>;
  /** Map of the location. Used at the top of the Location's Photo Gallery. Used to look up the Map and add it to the One-to-One relationship. */
  coverImageId?: Maybe<Scalars["Float"]>;
};

/** Optional inputs to be used to update the Location's metadata. */
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

/** Input to retrieve Location and Location's Photos. */
export type LocationNamedInput = {
  name: Scalars["String"];
};

export type AllPhotosAtLocationInput = {
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

/** Input to retrieve Photographer and Photographer's Photos. */
export type PhotographerNamedInput = {
  name: Scalars["String"];
};

export type AllPhotosByPhotographerInput = {
  id?: Maybe<Scalars["Float"]>;
  firstName?: Maybe<Scalars["String"]>;
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

export type AllPhotosInput = {
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

export type AllFeaturedPhotosInput = {
  cursor?: Maybe<Scalars["Int"]>;
  take: Scalars["Int"];
};

export type SubjectInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type SubjectUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  coverImageId?: Maybe<Scalars["Float"]>;
};

export type AllPhotosOfSubjectInput = {
  subject: Scalars["String"];
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

export type AllPhotosWithTagInput = {
  tag: Scalars["String"];
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
  allPhotosAtLocation: PaginatedPhotosAtLocationResponse;
  /** Returns all Locations + maps, only. Meant to be used on the backend. */
  locations: Array<Location>;
  /** Returns one Location + portrait, only or null, if no matching id is found. Meant to be used on the backend. */
  location?: Maybe<Location>;
  /** Returns one Location + portrait AND Location's Photos and related data, or undefined if no Location matching name provided is found. Meant to be used on the frontend. Used for the Location's Gallery. */
  locationNamed?: Maybe<Location>;
  allPhotosByPhotographer: PaginatedPhotosByPhotographerResponse;
  /** Returns all Photographers + portraits, only. Meant to be used on the backend. */
  photographers: Array<Photographer>;
  /** Returns one Photographer + portrait, only or null, if no matching id is found. Meant to be used on the backend. */
  photographer?: Maybe<Photographer>;
  /** Returns one Photographer + portrait AND Photographer's Photos and related data. Meant to be used on the frontend. Used for the Photographer's Gallery. */
  photographerNamed?: Maybe<Photographer>;
  photos: Array<Photo>;
  allPhotos: PaginatedPhotoResponse;
  allFeaturedPhotos: PaginatedPhotoResponse;
  photo?: Maybe<Photo>;
  allPhotosOfSubject: PaginatedPhotosOfSubjectResponse;
  subjects: Array<Subject>;
  subject: Subject;
  subjectWithName?: Maybe<Subject>;
  allPhotosWithTag: PaginatedPhotosOfTagResponse;
  tags: Array<Tag>;
  photosWithTag: Tag;
  users: Array<User>;
  user: User;
  userSummaries: Array<User>;
  newsletterSubscribers: Array<User>;
  /** Returns all Photos favorited by the signed in User. */
  favorites?: Maybe<Array<Photo>>;
  /** Returns all Photos in the shopping bag of the signed in User. */
  shoppingBagItems?: Maybe<Array<Photo>>;
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

export type QueryAllPhotosAtLocationArgs = {
  input: AllPhotosAtLocationInput;
};

export type QueryLocationArgs = {
  id: Scalars["Int"];
};

export type QueryLocationNamedArgs = {
  input: LocationNamedInput;
};

export type QueryAllPhotosByPhotographerArgs = {
  input: AllPhotosByPhotographerInput;
};

export type QueryPhotographerArgs = {
  id: Scalars["Int"];
};

export type QueryPhotographerNamedArgs = {
  input: PhotographerNamedInput;
};

export type QueryAllPhotosArgs = {
  input: AllPhotosInput;
};

export type QueryAllFeaturedPhotosArgs = {
  input: AllFeaturedPhotosInput;
};

export type QueryPhotoArgs = {
  id: Scalars["Int"];
};

export type QueryAllPhotosOfSubjectArgs = {
  input: AllPhotosOfSubjectInput;
};

export type QuerySubjectArgs = {
  id: Scalars["Int"];
};

export type QuerySubjectWithNameArgs = {
  input: SubjectInput;
};

export type QueryAllPhotosWithTagArgs = {
  input: AllPhotosWithTagInput;
};

export type QueryPhotosWithTagArgs = {
  input: TagInput;
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

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
  addTag: Tag;
  updateTag: Tag;
  deleteTag: Scalars["Boolean"];
  getApiToken: Scalars["String"];
  subscribeToNewsletter: Scalars["Boolean"];
  unsubscribeFromNewsletter: Scalars["Boolean"];
  addPhotoToFavorites: Scalars["Boolean"];
  removePhotoFromFavorites: Scalars["Boolean"];
  toggleUserFavorite: Scalars["Boolean"];
  addPhotoToShoppingBag: Scalars["Boolean"];
  removePhotoFromShoppingBag: Scalars["Boolean"];
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

export type MutationGetApiTokenArgs = {
  input: GetApiTokenInput;
};

export type MutationAddPhotoToFavoritesArgs = {
  photoId: Scalars["Float"];
};

export type MutationRemovePhotoFromFavoritesArgs = {
  photoId: Scalars["Float"];
};

export type MutationToggleUserFavoriteArgs = {
  photoId: Scalars["Float"];
};

export type MutationAddPhotoToShoppingBagArgs = {
  photoId: Scalars["Float"];
};

export type MutationRemovePhotoFromShoppingBagArgs = {
  photoId: Scalars["Float"];
};

export type ImageInfoFragment = { __typename?: "Image" } & Pick<
  Image,
  "id" | "imageUrl" | "altText" | "fileType" | "fileExtension" | "size" | "width" | "height"
>;

export type AllPhotosAtLocationQueryVariables = Exact<{
  input: AllPhotosAtLocationInput;
}>;

export type AllPhotosAtLocationQuery = { __typename?: "Query" } & {
  allPhotosAtLocation: {
    __typename?: "PaginatedPhotosAtLocationResponse";
  } & Pick<PaginatedPhotosAtLocationResponse, "startCursor" | "endCursor" | "total"> & {
      locationInfo: { __typename?: "Location" } & Pick<
        Location,
        "id" | "name" | "tag" | "description"
      > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
      items: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
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
    __typename?: "PaginatedPhotosByPhotographerResponse";
  } & Pick<PaginatedPhotosByPhotographerResponse, "startCursor" | "endCursor" | "total"> & {
      photographerInfo: {
        __typename?: "Photographer";
      } & PhotographerInfoFragment;
      items: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
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
          "id" | "imageUrl" | "altText" | "fileType" | "fileExtension" | "size" | "width" | "height"
        >
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
  };

export type AllPhotosQueryVariables = Exact<{
  input: AllPhotosInput;
}>;

export type AllPhotosQuery = { __typename?: "Query" } & {
  allPhotos: { __typename?: "PaginatedPhotoResponse" } & Pick<
    PaginatedPhotoResponse,
    "startCursor" | "endCursor" | "total"
  > & { items: Array<{ __typename?: "Photo" } & PhotoInfoFragment> };
};

export type AllFeaturedPhotosQueryVariables = Exact<{
  input: AllFeaturedPhotosInput;
}>;

export type AllFeaturedPhotosQuery = { __typename?: "Query" } & {
  allFeaturedPhotos: { __typename?: "PaginatedPhotoResponse" } & Pick<
    PaginatedPhotoResponse,
    "startCursor" | "endCursor" | "total"
  > & { items: Array<{ __typename?: "Photo" } & PhotoInfoFragment> };
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
      photographer?: Maybe<{ __typename?: "Photographer" } & Pick<Photographer, "id" | "name">>;
      location?: Maybe<{ __typename?: "Location" } & Pick<Location, "id" | "name">>;
    };
};

export type AllPhotosOfSubjectQueryVariables = Exact<{
  input: AllPhotosOfSubjectInput;
}>;

export type AllPhotosOfSubjectQuery = { __typename?: "Query" } & {
  allPhotosOfSubject: {
    __typename?: "PaginatedPhotosOfSubjectResponse";
  } & Pick<PaginatedPhotosOfSubjectResponse, "startCursor" | "endCursor" | "total"> & {
      subjectInfo: { __typename?: "Subject" } & Pick<
        Subject,
        "id" | "name" | "description" | "createdAt" | "updatedAt"
      > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
      items: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type AllPhotosWithTagQueryVariables = Exact<{
  input: AllPhotosWithTagInput;
}>;

export type AllPhotosWithTagQuery = { __typename?: "Query" } & {
  allPhotosWithTag: { __typename?: "PaginatedPhotosOfTagResponse" } & Pick<
    PaginatedPhotosOfTagResponse,
    "startCursor" | "endCursor" | "total"
  > & {
      tagInfo: { __typename?: "Tag" } & Pick<
        Tag,
        "id" | "name" | "description" | "createdAt" | "updatedAt"
      > & { coverImage?: Maybe<{ __typename?: "Image" } & ImageInfoFragment> };
      items: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
    };
};

export type GetApiTokenMutationVariables = Exact<{
  input: GetApiTokenInput;
}>;

export type GetApiTokenMutation = { __typename?: "Mutation" } & Pick<Mutation, "getApiToken">;

export type AddPhotoToFavoritesMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type AddPhotoToFavoritesMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "addPhotoToFavorites"
>;

export type RemovePhotoFromFavoritesMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type RemovePhotoFromFavoritesMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "removePhotoFromFavorites">;

export type AddPhotoToShoppingBagMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type AddPhotoToShoppingBagMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "addPhotoToShoppingBag"
>;

export type RemovePhotoFromShoppingBagMutationVariables = Exact<{
  photoId: Scalars["Float"];
}>;

export type RemovePhotoFromShoppingBagMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "removePhotoFromShoppingBag">;

export type FavoritesQueryVariables = Exact<{ [key: string]: never }>;

export type FavoritesQuery = { __typename?: "Query" } & {
  favorites?: Maybe<Array<{ __typename?: "Photo" } & PhotoInfoFragment>>;
};

export type ShoppingBagItemsQueryVariables = Exact<{ [key: string]: never }>;

export type ShoppingBagItemsQuery = { __typename?: "Query" } & {
  shoppingBagItems?: Maybe<Array<{ __typename?: "Photo" } & PhotoInfoFragment>>;
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
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "imageUrl" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "altText" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "fileType" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "fileExtension" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "size" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "width" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "height" },
            arguments: [],
            directives: []
          }
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
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "name" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "firstName" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "lastName" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "email" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "bio" },
            arguments: [],
            directives: []
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
                  directives: []
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
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "id" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "rating" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sku" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sortIndex" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "title" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "description" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "isFeatured" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "isLimitedEdition" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "rating" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "basePrice" },
            arguments: [],
            directives: []
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "priceModifier" },
            arguments: [],
            directives: []
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
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "imageUrl" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "altText" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fileType" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fileExtension" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "size" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "width" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "height" },
                  arguments: [],
                  directives: []
                }
              ]
            }
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
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "name" },
                  arguments: [],
                  directives: []
                }
              ]
            }
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
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "name" },
                  arguments: [],
                  directives: []
                }
              ]
            }
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
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
                }
              ]
            }
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
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
                }
              ]
            }
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
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: []
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
          },
          directives: []
        }
      ],
      directives: [],
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
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tag" },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                        arguments: [],
                        directives: []
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
                              directives: []
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "startCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "endCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "total" },
                  arguments: [],
                  directives: []
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
          },
          directives: []
        }
      ],
      directives: [],
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
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "startCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "endCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "total" },
                  arguments: [],
                  directives: []
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
export const AllPhotosDocument: DocumentNode<AllPhotosQuery, AllPhotosQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allPhotos" },
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
              name: { kind: "Name", value: "AllPhotosInput" }
            }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allPhotos" },
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "startCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "endCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "total" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: []
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
              name: { kind: "Name", value: "AllFeaturedPhotosInput" }
            }
          },
          directives: []
        }
      ],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allFeaturedPhotos" },
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
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "startCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "endCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "total" },
                  arguments: [],
                  directives: []
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
export const AddPhotoDocument: DocumentNode<AddPhotoMutation, AddPhotoMutationVariables> = {
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
            name: { kind: "Name", value: "input" }
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PhotoInput" }
            }
          },
          directives: []
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "id" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "title" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "description" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isFeatured" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isLimitedEdition" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isDiscontinued" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rating" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "basePrice" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "priceModifier" },
                  arguments: [],
                  directives: []
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
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
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
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: []
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
          },
          directives: []
        }
      ],
      directives: [],
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
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                        arguments: [],
                        directives: []
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
                              directives: []
                            }
                          ]
                        }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "startCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "endCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "total" },
                  arguments: [],
                  directives: []
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
          },
          directives: []
        }
      ],
      directives: [],
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
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "name" },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                        arguments: [],
                        directives: []
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
                              directives: []
                            }
                          ]
                        }
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PhotoInfo" },
                        directives: []
                      }
                    ]
                  }
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "startCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "endCursor" },
                  arguments: [],
                  directives: []
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "total" },
                  arguments: [],
                  directives: []
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
          },
          directives: []
        }
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
                  name: { kind: "Name", value: "input" }
                }
              }
            ],
            directives: []
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
          },
          directives: []
        }
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
                  name: { kind: "Name", value: "photoId" }
                }
              }
            ],
            directives: []
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
          },
          directives: []
        }
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
                  name: { kind: "Name", value: "photoId" }
                }
              }
            ],
            directives: []
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
          },
          directives: []
        }
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
                  name: { kind: "Name", value: "photoId" }
                }
              }
            ],
            directives: []
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
          },
          directives: []
        }
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
                  name: { kind: "Name", value: "photoId" }
                }
              }
            ],
            directives: []
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
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "PhotoInfo" },
                  directives: []
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
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "PhotoInfo" },
                  directives: []
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
