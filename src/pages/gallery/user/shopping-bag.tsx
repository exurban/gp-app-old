import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import ErrorMessage from "../../../components/ErrorMessage";
import { useQuery } from "@apollo/client";
import { ShoppingBagItemsDocument } from "../../../graphql-operations";
import { Heading, Flex, Text, Icon, Divider, RadioGroup } from "bumbag";
import Loader from "../../../components/Loader";

const ShoppingBagGallery: React.FC = () => {
  const router = useRouter();
  const [session, sessionLoading] = useSession();

  if (typeof window !== "undefined" && sessionLoading) return null;

  if (typeof window !== "undefined" && !session) {
    router.push(`/auth/signin`);
  }

  const { loading, error, data } = useQuery(ShoppingBagItemsDocument);

  if (error) return <ErrorMessage message="Error loading photos." />;

  if (loading) return <Loader />;

  if (data) {
    const photos = data.shoppingBagItems.photoList;
    if (photos !== null && photos !== undefined && photos.length == 0) {
      return (
        <Flex
          flexFlow="row nowrap"
          width="80%"
          marginX="auto"
          marginY="major-4"
          justifyContent="space-between"
        >
          <Heading use="h2" marginLeft="major-1">
            Your bag is empty!
          </Heading>
        </Flex>
      );
    }

    return (
      <>
        <Flex
          flexFlow="row nowrap"
          width="80%"
          marginX="auto"
          marginY="major-4"
          justifyContent="space-between"
        >
          <Heading use="h2" marginLeft="major-1">
            <Icon aria-label="Shopping Bag" icon="solid-shopping-bag" fontSize="600" />
            Your shopping bag
          </Heading>
          <Flex>
            <Heading use="h4" alignY="bottom" marginRight="major-1">
              <Text>{photos?.length} photos</Text>
            </Heading>
          </Flex>
        </Flex>
        <Flex flexDirection="column" width="90%" maxWidth="1200px" marginX="auto">
          {photos?.map(photo => (
            <Flex key={photo.id} flexDirection="row">
              <Flex flexDirection="column" width="40%">
                <Heading use="h4">{photo.title}</Heading>
                <Heading use="h6">{photo?.photographer?.name}</Heading>
                <Text>{photo?.location?.name}</Text>
                <Text>{photo?.description}</Text>
              </Flex>
              <Flex flexDirection="column" width="12%" marginLeft="major-3">
                <Heading use="h6" marginBottom="major-2">
                  Finish
                </Heading>
                <RadioGroup
                  spacing="major-2"
                  name={photo.id}
                  options={[
                    { label: "Fine Art Print", value: "fap" },
                    { label: "Aluminum", value: "alu" },
                    { label: "Ceramic", value: "cer" }
                  ]}
                ></RadioGroup>
              </Flex>
              <Flex flexDirection="column" width="12%" marginLeft="major-3">
                <Heading use="h6" marginBottom="major-2">
                  Size
                </Heading>
                <RadioGroup
                  spacing="major-2"
                  name={photo.id}
                  marginBottom="major-4"
                  options={[
                    { label: `12"h x 18"w`, value: "12x18" },
                    { label: `16"h x 24"w`, value: "16x24" },
                    { label: `20"h x 30"w`, value: "20x30" },
                    { label: `30"h x 40"w`, value: "30x40" }
                  ]}
                ></RadioGroup>
              </Flex>
              <Divider marginY="major-4" />
            </Flex>
          ))}
        </Flex>
      </>
    );
  } else {
    return <p>Something bad happened.</p>;
  }
};

export default ShoppingBagGallery;
