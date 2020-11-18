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
  DateTime: any;
};

export type Location = {
  __typename?: "Location";
  id: Scalars["ID"];
  name: Scalars["String"];
  tag: Scalars["String"];
  photos: Array<Photo>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Collection = {
  __typename?: "Collection";
  id: Scalars["ID"];
  name: Scalars["String"];
  tag: Scalars["String"];
  description: Scalars["String"];
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
  photo: Photo;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
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
  /** The URL for the artist's portrait. */
  photoUrl: Scalars["String"];
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
  name: Scalars["String"];
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
  title: Scalars["String"];
  description: Scalars["String"];
  isDiscontinued: Scalars["Boolean"];
  isFeatured: Scalars["Boolean"];
  isLimitedEdition: Scalars["Boolean"];
  rating: Scalars["Int"];
  basePrice?: Maybe<Scalars["Float"]>;
  priceModifier?: Maybe<Scalars["Float"]>;
  photographer: Photographer;
  location: Location;
  images: Array<Image>;
  subjectsInPhoto: Array<PhotoSubject>;
  tagsForPhoto: Array<PhotoTag>;
  collectionsForPhoto: Array<PhotoCollection>;
  finishesForPhoto: Array<PhotoFinish>;
  favoritedByUsers: Array<UserFavorite>;
  inShoppingBagsOfUsers: Array<UserShoppingBagItem>;
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

export type LocationInput = {
  name: Scalars["String"];
  tag: Scalars["String"];
};

export type LocationUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  tag?: Maybe<Scalars["String"]>;
};

export type PhotoCollectionInput = {
  photoId: Scalars["Int"];
  collectionId: Scalars["Int"];
};

export type PhotoFinishInput = {
  photoId: Scalars["Int"];
  finishId: Scalars["Int"];
};

export type PhotographerInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  bio: Scalars["String"];
  photoUrl: Scalars["String"];
};

export type PhotographerUpdateInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  photoUrl?: Maybe<Scalars["String"]>;
};

export type PhotoInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  isFeatured?: Maybe<Scalars["Boolean"]>;
  isLimitedEdition?: Maybe<Scalars["Boolean"]>;
  rating?: Maybe<Scalars["Int"]>;
  basePrice: Scalars["Float"];
  priceModifier?: Maybe<Scalars["Float"]>;
  photographerId: Scalars["Float"];
  locationId: Scalars["Float"];
};

export type PhotoUpdateInput = {
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  subjects?: Maybe<Array<Scalars["String"]>>;
  tags?: Maybe<Array<Scalars["String"]>>;
  discontinued?: Maybe<Scalars["Boolean"]>;
  isFeatured?: Maybe<Scalars["Boolean"]>;
  isLimitedEdition?: Maybe<Scalars["Boolean"]>;
  rating?: Maybe<Scalars["Int"]>;
  basePrice?: Maybe<Scalars["Float"]>;
  priceModifier?: Maybe<Scalars["Float"]>;
  photographerId?: Maybe<Scalars["Float"]>;
  locationId?: Maybe<Scalars["Float"]>;
};

export type SubjectInput = {
  name: Scalars["String"];
};

export type SubjectUpdateInput = {
  name?: Maybe<Scalars["String"]>;
};

export type TagInput = {
  name: Scalars["String"];
};

export type TagUpdateInput = {
  name?: Maybe<Scalars["String"]>;
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
  locations: Array<Location>;
  location?: Maybe<Location>;
  photosTakenAtLocation?: Maybe<Location>;
  photographers: Array<Photographer>;
  photographer?: Maybe<Photographer>;
  photos: Array<Photo>;
  featuredPhotos: Array<Photo>;
  photo: Photo;
  subjects: Array<Subject>;
  subject: Subject;
  subjectWithName: Subject;
  tags: Array<Tag>;
  photosWithTag: Tag;
  users: Array<User>;
  user: User;
  userSummaries: Array<User>;
  getUserFavorites: Array<UserFavorite>;
  newsletterSubscribers: Array<User>;
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

export type QueryLocationArgs = {
  id: Scalars["Int"];
};

export type QueryPhotosTakenAtLocationArgs = {
  id: Scalars["Int"];
};

export type QueryPhotographerArgs = {
  id: Scalars["Int"];
};

export type QueryPhotoArgs = {
  id: Scalars["Int"];
};

export type QuerySubjectArgs = {
  id: Scalars["Int"];
};

export type QuerySubjectWithNameArgs = {
  input: SubjectInput;
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

export type PhotographerInfoFragment = { __typename?: "Photographer" } & Pick<
  Photographer,
  "id" | "name" | "firstName" | "lastName" | "email" | "bio" | "photoUrl"
>;

export type PhotoInfoFragment = { __typename?: "Photo" } & Pick<
  Photo,
  | "id"
  | "sku"
  | "title"
  | "description"
  | "isFeatured"
  | "isLimitedEdition"
  | "rating"
  | "basePrice"
  | "priceModifier"
  | "createdAt"
  | "updatedAt"
> & {
    photographer: { __typename?: "Photographer" } & PhotographerInfoFragment;
    location: { __typename?: "Location" } & Pick<Location, "id" | "name">;
    images: Array<
      { __typename?: "Image" } & Pick<
        Image,
        "id" | "altText" | "imageUrl" | "width" | "height"
      >
    >;
    subjectsInPhoto: Array<
      { __typename?: "PhotoSubject" } & {
        subject: { __typename?: "Subject" } & Pick<Subject, "id" | "name">;
      }
    >;
    tagsForPhoto: Array<
      { __typename?: "PhotoTag" } & {
        tag: { __typename?: "Tag" } & Pick<Tag, "id" | "name">;
      }
    >;
    collectionsForPhoto: Array<
      { __typename?: "PhotoCollection" } & {
        collection: { __typename?: "Collection" } & Pick<
          Collection,
          "id" | "name"
        >;
      }
    >;
  };

export type AllPhotosQueryQueryVariables = Exact<{ [key: string]: never }>;

export type AllPhotosQueryQuery = { __typename?: "Query" } & {
  photos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
};

export type FeaturedPhotosQueryQueryVariables = Exact<{ [key: string]: never }>;

export type FeaturedPhotosQueryQuery = { __typename?: "Query" } & {
  featuredPhotos: Array<{ __typename?: "Photo" } & PhotoInfoFragment>;
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
      photographer: { __typename?: "Photographer" } & Pick<
        Photographer,
        "id" | "name"
      >;
      location: { __typename?: "Location" } & Pick<Location, "id" | "name">;
    };
};

export type SubjectWithNameQueryVariables = Exact<{
  input: SubjectInput;
}>;

export type SubjectWithNameQuery = { __typename?: "Query" } & {
  subjectWithName: { __typename?: "Subject" } & Pick<
    Subject,
    "id" | "name" | "createdAt" | "updatedAt"
  > & {
      photosOfSubject: Array<
        { __typename?: "PhotoSubject" } & {
          photo: { __typename?: "Photo" } & PhotoInfoFragment;
        }
      >;
    };
};

export type PhotosWithTagQueryVariables = Exact<{
  input: TagInput;
}>;

export type PhotosWithTagQuery = { __typename?: "Query" } & {
  photosWithTag: { __typename?: "Tag" } & Pick<
    Tag,
    "id" | "name" | "createdAt" | "updatedAt"
  > & {
      photosWithTag: Array<
        { __typename?: "PhotoTag" } & {
          photo: { __typename?: "Photo" } & PhotoInfoFragment;
        }
      >;
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
            name: { kind: "Name", value: "photoUrl" },
            arguments: [],
            directives: [],
          },
        ],
      },
    },
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
            name: { kind: "Name", value: "sku" },
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
            name: { kind: "Name", value: "photographer" },
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
                  name: { kind: "Name", value: "altText" },
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
    ...PhotographerInfoFragmentDoc.definitions,
  ],
};
export const AllPhotosQueryDocument: DocumentNode<
  AllPhotosQueryQuery,
  AllPhotosQueryQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allPhotosQuery" },
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
export const FeaturedPhotosQueryDocument: DocumentNode<
  FeaturedPhotosQueryQuery,
  FeaturedPhotosQueryQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "featuredPhotosQuery" },
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "featuredPhotos" },
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
export const SubjectWithNameDocument: DocumentNode<
  SubjectWithNameQuery,
  SubjectWithNameQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "subjectWithName" },
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
              name: { kind: "Name", value: "SubjectInput" },
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
            name: { kind: "Name", value: "subjectWithName" },
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
                  name: { kind: "Name", value: "name" },
                  arguments: [],
                  directives: [],
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photosOfSubject" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "photo" },
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
        ],
      },
    },
    ...PhotoInfoFragmentDoc.definitions,
  ],
};
export const PhotosWithTagDocument: DocumentNode<
  PhotosWithTagQuery,
  PhotosWithTagQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "photosWithTag" },
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
              name: { kind: "Name", value: "TagInput" },
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
            name: { kind: "Name", value: "photosWithTag" },
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
                  name: { kind: "Name", value: "name" },
                  arguments: [],
                  directives: [],
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "photosWithTag" },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "photo" },
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
        ],
      },
    },
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
          },
        ],
      },
    },
  ],
};
