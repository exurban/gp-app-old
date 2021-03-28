import type { NextApiRequest, NextApiResponse } from "next";
import * as sgMail from "@sendgrid/mail";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const sgApiKey = process.env.SENDGRID_API_KEY;
  if (!sgApiKey) {
    res.status(400).send("Message not sent.");
    return;
  }

  sgMail.setApiKey(sgApiKey);

  console.log(`got a request to send an email. ${JSON.stringify(req.body, null, 2)}`);
  const {
    senderName,
    senderEmail,
    recipientName,
    recipientEmail,
    message,
    shareImageUrl,
    shareUrl
  } = req.body;

  const mainBackgroundColor = "#1d1e1d";
  const textColor = "#f7f7f7";
  const imageUrl = shareImageUrl;
  const imageInfoPage = shareUrl;

  const content = {
    to: `${recipientEmail}`,
    from: `info@gibbs-photography.com`,
    reply_to: `${senderEmail}`,
    subject: `${recipientName} -- ${senderName} shared an image from Gibbs Photography with you`,
    text: `${message} ${imageInfoPage}`,
    html: `<head>
      <title></title>
    </head>
      <body style="background: ${mainBackgroundColor}">
    <a href=${shareUrl}>
      <table width="100%" border="0px" cellspacing="0px" margin="auto">
        <tr>
          <td style="text-align: center; padding: 20px 0px 20px 0px">
            <img
            src=http://cdn.mcauto-images-production.sendgrid.net/b9c1c22955b8918a/971309ce-ee0e-4d50-8770-fcec627f5c17/512x512.png
            alt="logo" height=128 width=128 />
          </td>
        </tr>
        <tr
          style="
            text-align: center;
            padding: 20px;
            font-size: 18px;
            line-height: 24px;
            font-family: Helvetica, Arial, sans-serif;
            color: ${textColor};
          "
        >
          <td>I thought you might like this photo!</td>
        </tr>
        <tr>
          <td style="text-align: center; padding: 20px">
            <img
            src=${imageUrl}
            alt=photo width=615 height=300/>
          </td>
        </tr>
      </table>
    </a>
  </body>`
  };

  try {
    await sgMail.send(content);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).send("Failed to send email.");
  }
}
