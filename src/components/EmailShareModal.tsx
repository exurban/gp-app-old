import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/client";
import { EmailIcon } from "react-share";
import { PhotoInfoFragment } from "../graphql-operations";
import {
  Modal,
  Flex,
  Card,
  Button,
  Text,
  Spinner,
  FieldStack,
  InputField,
  TextareaField
} from "bumbag";

type Props = {
  photo: PhotoInfoFragment;
};

const EmailShareModal: React.FC<Props> = ({ photo }) => {
  const [isSending, setIsSending] = useState(false);
  const modal = Modal.useState();
  const [session] = useSession();
  const user = session?.user;

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResponse = (status: number, msg: any) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      });
      clearForm();
    } else {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: true, msg: msg }
      });
    }
  };

  type emailValues = {
    senderName: string;
    senderEmail: string;
    recipientName: string;
    recipientEmail: string;
    message: string;
    shareImageUrl: string;
    shareUrl: string;
  };

  const sendEmail = async (emailValues: emailValues) => {
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    console.log(`posting to api/send`);
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
    // shareImageUrl: photo.images[0].imageUrl,
    shareImageUrl: photo.emailSharingImage?.imageUrl || "",
    shareUrl: `https://gibbs-photography.com/image/${photo.sku}`
  };

  const validationObject = {
    senderName: Yup.string().required("Required"),
    senderEmail: Yup.string().email("Invalid email address").required("Required"),
    recipientName: Yup.string().required("Required"),
    recipientEmail: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required")
  };

  const clearForm = () => {
    console.log(`clear form`);
    setIsSending(false);
    modal.hide;
  };

  return (
    <>
      <Flex flexDirection="row">
        <Modal.Disclosure {...modal}>
          <EmailIcon size={36} style={{ borderRadius: "50%", marginLeft: "8px" }} />
        </Modal.Disclosure>
      </Flex>
      <Modal {...modal}>
        <Card>
          {!isSending ? (
            <>
              <Flex
                className="fields-wrapper"
                flexDirection="column"
                minWidth="300px"
                margin="major-3"
                flex="2 1 50%"
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationObject)}
                  onSubmit={values => {
                    setIsSending(true);
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

                    <Flex marginTop="major-2">
                      <Modal.Disclosure
                        use={Button}
                        {...modal}
                        marginLeft="auto"
                        marginRight="major-1"
                      >
                        Close
                      </Modal.Disclosure>
                      <Button type="submit">Send</Button>
                    </Flex>
                  </Form>
                </Formik>
              </Flex>
            </>
          ) : (
            <Flex alignX="center" alignY="center">
              {status.submitting && (
                <>
                  <Spinner fontSize="50px" />
                  <Text.Block marginLeft="major-2">Sending email.</Text.Block>
                </>
              )}
              {status.submitted && status.info.error && (
                <>
                  <Text.Block>Error: {status.info.error}</Text.Block>
                </>
              )}
              {status.submitted && !status.info.error && (
                <>
                  <Text.Block>Your message is on its way!</Text.Block>
                </>
              )}
            </Flex>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default EmailShareModal;
