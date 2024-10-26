function onFormSubmit(e) {
  const info = e.namedValues;
  const pdfFile = generatePDF(info);
  const printPdf = genPDF(info)
  sendEmail(e.namedValues["Email"][0], pdfFile, printPdf);
}

function sendEmail(email, pdfFile, printPdf) {
  GmailApp.sendEmail(email, "Bite-Sized Wisdom: Quick Lectures By First Year CSE(Cybersecurity) Students", "Thank You for Participating!\n\nWe sincerely appreciate your involvement in Bite-Sized Wisdom. Your presence and engagement made a significant impact, and we hope you enjoyed the experience.\n\nLooking forward to seeing you at our future events!\n\nYour Certificate for participation has been attached to this e-mail\nYour writing assignment has been attached to this e-mail too!\nYou have to take a printout of it and submit it as a hard copy.\nIf you don't like that, then you can write your very own one page writeup", {
    attachments : [pdfFile.getAs(MimeType.PDF),printPdf.getAs(MimeType.PDF)],
    name: "Certificate of Participation"
  });
}

function generatePDF(info) {

  const tempPDF = DriveApp.getFileById("13FnQC_Zu0Esd2dOCnpEu53PAnmCgjj5kaAUhRpp2lLk");
  const pdfFolder = DriveApp.getFolderById("1S-lJwf-pMkflztrTBJsp46gFPvsPz9kI");

  const newTemp = tempPDF.makeCopy();

  const newDoc = DocumentApp.openById(newTemp.getId());
  const body = newDoc.getBody();

  body.replaceText("{name}", info["Full Name"][0]);

  newDoc.saveAndClose();

  const blobPDF = newTemp.getAs(MimeType.PDF);
  const pdfFile = pdfFolder.createFile(blobPDF).setName(info["Full Name"] + "'s Certificate of Participation");
  pdfFolder.removeFile(newTemp);

  return pdfFile;
}

function genPDF(info) {

  const tempPDF = DriveApp.getFileById("1Lw05sRF0a10KPPxHQRBQlPSDYcJtvhuajwmi8qTHOmY");
  const pdfFolder = DriveApp.getFolderById("1mkoDjdZ0AYzKATvqOv_HUIgS5M5VPvGB");

  const newTemp = tempPDF.makeCopy();

  const newDoc = DocumentApp.openById(newTemp.getId());
  const body = newDoc.getBody();

  body.replaceText("{name}", info["Full Name"][0]);
  body.replaceText("{topic}", info["Your Topic Title"][0]);
  body.replaceText("{content}", info["Topic Description"][0]);

  newDoc.saveAndClose();

  const blobPDF = newTemp.getAs(MimeType.PDF);
  const pdfFile = pdfFolder.createFile(blobPDF).setName(info["Full Name"] + "'s Writeup");
  pdfFolder.removeFile(newTemp);

  return pdfFile;
}
