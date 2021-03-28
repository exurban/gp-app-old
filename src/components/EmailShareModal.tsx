import { Formik, Form, Field } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { useSession } from "next-auth/client";
import { EmailIcon } from "react-share";
import { PhotoInfoFragment } from "../graphql-operations";
import {
  Modal,
  Flex,
  Card,
  Box,
  Button,
  FieldStack,
  InputField,
  TextareaField,
  applyTheme,
  useToasts
} from "bumbag";

type Props = {
  photo: PhotoInfoFragment;
};

const EmailShareModal: React.FC<Props> = ({ photo }) => {
  const modal = Modal.useState();
  const [session] = useSession();
  const user = session?.user;
  const toast = useToasts();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResponse = (status: number, msg: any) => {
    if (status === 200) {
      toast.success({
        title: "Success!",
        message: msg
      });
    } else {
      toast.warning({
        title: "Failure",
        message: msg
      });
    }
    clearForm();
  };

  type emailValues = {
    senderName: string;
    senderEmail: string;
    recipientName: string;
    recipientEmail: string;
    message: string;
    shareImageUrl: string;
    shareUrl: string;
    imageWidth: number;
    imageHeight: number;
  };

  const sendEmail = async (emailValues: emailValues) => {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailValues)
    });
    const text = await res.text();
    handleResponse(res.status, text);
  };

  const initialValues = {
    senderName: user?.name || "",
    senderEmail: user?.email || "",
    recipientName: "",
    recipientEmail: "",
    message: "I thought you might like this photo.",
    shareImageUrl: photo.emailSharingImage?.imageUrl || "",
    shareUrl: `https://gibbs-photography.com/image/${photo.sku}`,
    imageWidth: photo.emailSharingImage ? photo.emailSharingImage.width / 2 : 0,
    imageHeight: photo.emailSharingImage ? photo.emailSharingImage.height / 2 : 0
  };

  const validationObject = {
    senderName: Yup.string().required("Required"),
    senderEmail: Yup.string().email("Invalid email address").required("Required"),
    recipientName: Yup.string().required("Required"),
    recipientEmail: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required")
  };

  const clearForm = () => {
    modal.hide;
  };

  const FormWrapper = applyTheme(Flex, {
    styles: {
      base: {
        width: { default: "700px", "max-tablet": "400px" }
      }
    }
  });

  return (
    <>
      <Flex flexDirection="row">
        <Modal.Disclosure {...modal}>
          <EmailIcon size={36} style={{ borderRadius: "50%", marginLeft: "8px" }} />
        </Modal.Disclosure>
      </Flex>
      <Modal {...modal}>
        <Card>
          <>
            <FormWrapper
              className="fields-wrapper"
              flexDirection="column"
              margin="major-3"
              flex="2 1 50%"
            >
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationObject)}
                onSubmit={values => {
                  const emailValues = {
                    ...values,
                    photo: photo
                  };
                  sendEmail(emailValues);
                }}
              >
                <Form autoComplete="off" style={{ margin: 0, width: "100%" }}>
                  <FieldStack orientation="vertical" spacing="major-2">
                    <Field
                      component={InputField.Formik}
                      name="senderName"
                      label="Your Name"
                      type="text"
                      autoComplete="off"
                      value="senderName"
                    />
                    <Field
                      component={InputField.Formik}
                      name="senderEmail"
                      label="Your Email Address"
                      type="text"
                      autoComplete="off"
                      value="senderEmail"
                    />
                    <Field
                      component={InputField.Formik}
                      name="recipientName"
                      label="Recipient's Name"
                      type="text"
                      autoComplete="off"
                      value="recipientName"
                    />
                    <Field
                      component={InputField.Formik}
                      name="recipientEmail"
                      label="Recipient's Email Address"
                      type="email"
                      autoComplete="off"
                      value="recipientEmail"
                    />
                    <Field
                      component={TextareaField.Formik}
                      name="message"
                      label="Message"
                      value="message"
                      rows={6}
                      textareaProps={{ rows: 6, resize: "none" }}
                    />
                  </FieldStack>

                  {photo.emailSharingImage && (
                    <Box
                      className="image-wrapper"
                      overflow="hidden"
                      position="relative"
                      marginY="20px"
                      maxHeight="600px"
                    >
                      <Image
                        src={photo.emailSharingImage?.imageUrl}
                        alt={photo.emailSharingImage?.altText}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        sizes="(max-width: 400px) 100vw, 720px"
                      />
                    </Box>
                  )}

                  <Flex marginTop="major-2">
                    <Modal.Disclosure
                      use={Button}
                      {...modal}
                      marginLeft="auto"
                      marginRight="major-1"
                    >
                      Close
                    </Modal.Disclosure>
                    <Button type="submit" palette="primary">
                      Send
                    </Button>
                  </Flex>
                </Form>
              </Formik>
            </FormWrapper>
          </>
        </Card>
      </Modal>
    </>
  );
};

export default EmailShareModal;
