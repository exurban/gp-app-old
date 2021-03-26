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
  TextareaField,
  ActionButtons,
  Stack
} from "bumbag";

type Props = {
  photo: PhotoInfoFragment;
};

const EmailShareModal: React.FC<Props> = ({ photo }) => {
  const [isSending, setIsSending] = useState(false);
  const modal = Modal.useState();
  const [session] = useSession();
  const user = session?.user;

  const initialValues = {
    senderEmail: user?.email,
    recipientEmail: "",
    message: "I thought you might like this photo."
  };

  const validationObject = {
    senderEmail: Yup.string().email("Invalid email address").required("Required"),
    recipientEmail: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required")
  };

  const handleSend = () => {
    setIsSending(true);
    console.log(`sending email with photo ${photo.sku}`);
  };

  const clearForm = () => {
    setIsSending(false);
  };

  return (
    <>
      <Flex flexDirection="row">
        <Modal.Disclosure {...modal}>
          <EmailIcon />
        </Modal.Disclosure>
      </Flex>
      <Modal {...modal}>
        <Card>
          {!isSending ? (
            <>
              <Flex
                className="fields-wrapper"
                flexDirection="column"
                margin="major-3"
                flex="2 1 50%"
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationObject)}
                  onSubmit={values => {
                    console.log(`form submitted. ${JSON.stringify(values, null, 2)}`);
                  }}
                >
                  <Form autoComplete="off" style={{ margin: 0, width: "100%" }}>
                    <FieldStack orientation="vertical" spacing="major-2">
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
                    <Stack direction="horizontal" marginY="major-2">
                      <ActionButtons
                        type="submit"
                        alignX="right"
                        onClickCancel={() => clearForm()}
                      />
                    </Stack>
                  </Form>
                </Formik>
              </Flex>
              <Flex marginTop="major-2">
                <Modal.Disclosure use={Button} {...modal} marginLeft="auto" marginRight="major-1">
                  Close
                </Modal.Disclosure>
                <Button onClick={() => handleSend()}>Send</Button>
              </Flex>
            </>
          ) : (
            <Flex alignX="center" alignY="center">
              <Spinner fontSize="50px" />
              <Text.Block marginLeft="major-2">Sending email.</Text.Block>
            </Flex>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default EmailShareModal;
