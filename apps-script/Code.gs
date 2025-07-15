// Handle registration POST
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActive().getSheetByName("Students");
  sheet.appendRow([
    new Date(),
    data.name, data.class, data.roll,
    data.email, data.phone, data.parentWhatsapp,
    data.subjects, "", "", "", 0,
    "Pending", ""
  ]);
  MailApp.sendEmail(data.email, "Registration Received",
    `Dear ${data.name}, your registration is received.`);
  return ContentService.createTextOutput("Submitted");
}

// Admin function for approval/rejection
function updateStudentStatus(row, status) {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Students");
  const rowData = sheet.getRange(row,1,1,14).getValues()[0];
  const [timestamp, name,,,,email,,,,,,] = rowData;
  if (status === "Approved") {
    const studentID = "SID"+Math.floor(10000 + Math.random()*90000);
    sheet.getRange(row,13).setValue("Approved");
    sheet.getRange(row,14).setValue(studentID);
    MailApp.sendEmail(email, "Registration Approved",
      `Dear ${name}, your registration is approved. Your ID: ${studentID}`);
  } else {
    sheet.getRange(row,13).setValue("Rejected");
    MailApp.sendEmail(email, "Registration Rejected",
      `Dear ${name}, unfortunately your registration is rejected.`);
  }
}

// Custom menu for Google Sheet
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Admin Tools')
    .addItem('Approve selected', 'menuApprove')
    .addItem('Reject selected', 'menuReject')
    .addToUi();
}
function menuApprove() { applyStatusToSelection("Approved"); }
function menuReject() { applyStatusToSelection("Rejected"); }
function applyStatusToSelection(status) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName("Students");
  const range = sheet.getActiveRange();
  const rows = range.getRow();
  updateStudentStatus(rows, status);
}
