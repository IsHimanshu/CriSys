from twilio.rest import Client


def send_sms_alert(account_sid, auth_token, from_number, to_number, message):
    try:
        # Initialize the Twilio client
        client = Client(account_sid, auth_token)

        # Send the SMS
        client.messages.create(
            body=message,
            from_=from_number,
            to=to_number
        )

        print("SMS alert sent successfully!")

    except Exception as e:
        print(f"Error sending SMS alert: {str(e)}")


# Example usage
account_sid = "ACcba4c2b4401afdb6efcc364e36f4148b"
auth_token = "7a0a5d56280c619b6321da716a37338f"
from_number = "+12543234503"  # Twilio Sandbox number provided during the trial
numbers = ["+918423068386", "+918920419037", "+917903863776", "+916388374850"]
to_number = numbers  # Recipient's phone number
message = "This is an SMS alert."
for i in numbers:
    send_sms_alert(account_sid, auth_token, from_number, i, message)
