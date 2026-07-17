from email_types import EMAIL_TYPES


def suggest_subject(email_type):

    subjects = {
        "Sick Leave": "Sick Leave Request",

        "Meeting Request": "Request for Meeting",

        "File Submission": "Submission of Requested File",

        "Project Update": "Project Progress Update",

        "Follow-up Email": "Following Up on Previous Discussion",

        "Complaint": "Formal Complaint",

        "Deadline Extension": "Request for Deadline Extension"
    }

    return subjects.get(email_type, "Professional Email")